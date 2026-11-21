
import type {
  Response,
  NextFunction,
} from "express";

import type {
  AuthenticatedRequest,
} from "./auth.middleware.js";

export const authorizeAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {

  // Check authentication
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  // Check admin role
  if (req.user.role !== "ADMIN") {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });
    return;
  }

  next();
};
