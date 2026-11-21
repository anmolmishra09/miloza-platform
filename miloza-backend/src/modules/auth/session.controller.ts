
import type { RequestHandler } from "express";

import {
  refreshSession,
  revokeSession,
} from "./session.service.js";

import { AuthError } from "./auth.errors.js";

import type {
  AuthenticatedRequest,
} from "../../middleware/auth.middleware.js";

// Refresh token API
export const refreshController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const refreshToken = req.body?.refreshToken;

    if (
      typeof refreshToken !== "string" ||
      refreshToken.length === 0 ||
      refreshToken.length > 200
    ) {
      res.status(400).json({
        success: false,
        message: "Valid refresh token is required",
      });
      return;
    }

    const tokens = await refreshSession(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: tokens,
    });
  } catch (error) {
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

// Logout API
export const logoutController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;

    const userId = authenticatedReq.user?.id;

    const refreshToken = req.body?.refreshToken;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (
      typeof refreshToken !== "string" ||
      refreshToken.length === 0 ||
      refreshToken.length > 200
    ) {
      res.status(400).json({
        success: false,
        message: "Valid refresh token is required",
      });
      return;
    }

    await revokeSession(userId, refreshToken);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
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
