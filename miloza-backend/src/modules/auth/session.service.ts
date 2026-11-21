
import prisma from "../../config/prisma.js";

import { generateToken } from "../../utils/jwt.js";

import {
  generateRefreshToken,
  hashRefreshToken,
} from "../../utils/refresh-token.js";
import { AuthError } from "./auth.errors.js";
const REFRESH_TOKEN_DAYS = 7;

// Keep this module compatible with clients whose generated Prisma types omit
// the UserSession delegate, while still using the transaction client.
const userSession = (client: unknown): any =>
  (client as { userSession: any }).userSession;

const getRefreshExpiry = (): Date => {
  const expiry = new Date();

  expiry.setDate(expiry.getDate() + REFRESH_TOKEN_DAYS);

  return expiry;
};

// Create new session
export const createSession = async (userId: number) => {
  const refreshToken = generateRefreshToken();

  const refreshTokenHash = hashRefreshToken(refreshToken);

  await userSession(prisma).create({
    data: {
      userId,
      refreshTokenHash,
      expiresAt: getRefreshExpiry(),
    },
  });

  const accessToken = generateToken(userId);

  return {
    accessToken,
    refreshToken,
    expiresIn: 900,
    refreshExpiresIn: REFRESH_TOKEN_DAYS * 24 * 60 * 60,
  };
};

// Refresh existing session
export const refreshSession = async (token: string) => {
  const tokenHash = hashRefreshToken(token);

  const session = await userSession(prisma).findUnique({
    where: {
      refreshTokenHash: tokenHash,
    },
    include: {
      user: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  if (!session || session.revokedAt || session.expiresAt <= new Date()) {
    throw new AuthError(401, "Invalid or expired refresh token");
  }

  if (session.user.status !== "ACTIVE") {
    throw new AuthError(403, "Your account is not active");
  }

  const newRefreshToken = generateRefreshToken();

  const newRefreshTokenHash = hashRefreshToken(newRefreshToken);

  const newSession = await prisma.$transaction(async (tx) => {
    // Atomically revoke old session.
    const revoked = await userSession(tx).updateMany({
      where: {
        id: session.id,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      data: {
        revokedAt: new Date(),
      },
    });

    // Prevent reuse and concurrent refresh.
    if (revoked.count !== 1) {
      throw new AuthError(401, "Refresh token already used or revoked");
    }

    return userSession(tx).create({
      data: {
        userId: session.userId,
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: getRefreshExpiry(),
      },
    });
  });

  const accessToken = generateToken(session.userId);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn: 900,
    refreshExpiresIn: REFRESH_TOKEN_DAYS * 24 * 60 * 60,
  };
};

// Logout current session
export const revokeSession = async (
  userId: number,
  token: string
) => {
  const tokenHash = hashRefreshToken(token);

  const result = await userSession(prisma).updateMany({
    where: {
      userId,
      refreshTokenHash: tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  if (result.count === 0) {
    throw new AuthError(401, "Invalid or already revoked session");
  }

  return true;
};
