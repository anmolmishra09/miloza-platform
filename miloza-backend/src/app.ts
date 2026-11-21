
import "dotenv/config";

import express from "express";
import type { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes.js";
import profileRoutes from "./modules/profiles/profile.routes.js";
import {
  generalLimiter,
} from "./middleware/rate-limit.middleware.js";

const app = express();

interface ApiError extends Error {
  status?: number;
}

// ======================================
// Security Middleware
// ======================================

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ======================================
// Body Parsing Middleware
// ======================================

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(express.urlencoded({ extended: true }));

// ======================================
// Request Logging & Rate Limiting
// ======================================

app.use(morgan("dev"));

app.use("/api", generalLimiter);

// ======================================
// Welcome Route
// ======================================

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MILOZA API",
    version: "1.0.0",
  });
});

// ======================================
// Health Check
// ======================================

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "MILOZA Backend is running!",
    timestamp: new Date().toISOString(),
  });
});

// ======================================
// Authentication Routes
// ======================================

app.use("/api/v1/auth", authRoutes);

// ======================================
// Profile Routes
// ======================================

app.use("/api/v1/profile", profileRoutes);

// ======================================
// 404 Handler
// ======================================

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ======================================
// Global Error Handler
// ======================================

app.use(
  (
    error: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("API Error:", error);

    res.status(error.status || 500).json({
      success: false,
      message:
        error.status && error.status < 500
          ? error.message
          : "Internal server error",
    });
  }
);

export default app;
