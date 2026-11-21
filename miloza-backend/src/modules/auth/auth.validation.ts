
import { z } from "zod";
import type { RequestHandler } from "express";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(191)
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required")
    .max(72, "Password is too long")
    .refine(
      (value) => Buffer.byteLength(value, "utf8") <= 72,
      "Invalid password"
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(191)
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(72, "Password must not exceed 72 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .refine(
      (value) => Buffer.byteLength(value, "utf8") <= 72,
      "Password cannot exceed 72 UTF-8 bytes"
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Register Validation Middleware
export const validateRegister: RequestHandler = (
  req,
  res,
  next
) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  req.body = result.data;
  next();
};

// Login Validation Middleware
export const validateLogin: RequestHandler = (
  req,
  res,
  next
) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  req.body = result.data;
  next();
};
