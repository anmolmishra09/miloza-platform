
import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";
import { AuthError } from "./auth.errors.js";

import type {
  RegisterInput,
  LoginInput,
} from "./auth.validation.js";

// ==============================
// Auth Error
// ==============================

// export class AuthError extends Error {
//   constructor(
//     public statusCode: number,
//     message: string
//   ) {
//     super(message);
//     this.name = "AuthError";
//   }
// }

// ==============================
// Register User
// ==============================

export const registerUser = async (input: RegisterInput) => {
  const { fullName, email, password } = input;

  // 1. Check existing email
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new AuthError(409, "Email is already registered");
  }

  // 2. Hash password
  const passwordHash = await hashPassword(password);

  try {
    // 3. Create User and UserProfile atomically
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            fullName,
          },
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        profile: {
          select: {
            fullName: true,
          },
        },
      },
    });

    // 4. Generate JWT
    const token = generateToken(user.id);

    // 5. Return safe response
    return {
      token,
      user,
    };
  } catch (error) {
    // Handle duplicate email race condition
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AuthError(409, "Email is already registered");
    }

    throw error;
  }
};

// ==============================
// Login User
// ==============================

export const loginUser = async (input: LoginInput) => {
  const { email, password } = input;

  // 1. Find user
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      role: true,
      status: true,
      profile: {
        select: {
          fullName: true,
        },
      },
    },
  });

  // 2. Verify credentials
  if (!user) {
    throw new AuthError(401, "Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new AuthError(401, "Invalid email or password");
  }

  // 3. Check account status
  if (user.status !== "ACTIVE") {
    throw new AuthError(
      403,
      "Your account is not active. Please contact support."
    );
  }

  // 4. Generate JWT
  const token = generateToken(user.id);

  // 5. Return safe user data
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      profile: user.profile,
    },
  };
};
