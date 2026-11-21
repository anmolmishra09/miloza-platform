
import type { RequestHandler } from "express";

import {
  registerUser,
  loginUser,
} from "./auth.service.js";

import { AuthError } from "./auth.errors.js";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

// ==============================
// Register Controller
// ==============================

export const registerController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    const result = await registerUser(validation.data);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// ==============================
// Login Controller
// ==============================

export const loginController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    const result = await loginUser(validation.data);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
      return;
    }

    next(error);
  }
};
