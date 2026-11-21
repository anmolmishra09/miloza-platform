
import { Router } from "express";

import {
  registerController,
  loginController,
} from "./auth.controller.js";
import {
  refreshController,
  logoutController,
} from "./session.controller.js";

import { getCurrentUser } from "./auth.me.controller.js";

import {
  validateRegister,
} from "./auth.validation.js";

import {
  authenticate,
} from "../../middleware/auth.middleware.js";

import {
  authorizeAdmin,
} from "../../middleware/admin.middleware.js";
import {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} from "../../middleware/rate-limit.middleware.js";

const router = Router();

// Public routes
// Public routes
router.post("/register", registerLimiter, registerController);

router.post("/login", loginLimiter, loginController);

// Refresh token
router.post("/refresh", refreshLimiter, refreshController);

// Protected routes
router.get("/me", authenticate, getCurrentUser);

router.post("/logout", authenticate, logoutController);

// Protected routes
router.get(
  "/me",
  authenticate,
  getCurrentUser
);
// Public refresh endpoint
router.post("/refresh", refreshController);

// Protected logout endpoint
router.post("/logout", authenticate, logoutController);

router.get(
  "/protected",
  authenticate,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Protected route accessed successfully",
    });
  }
);

// Admin only route
router.get(
  "/admin-test",
  authenticate,
  authorizeAdmin,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to MILOZA Admin Dashboard",
    });
  }
);

export default router;
