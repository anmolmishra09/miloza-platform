
import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyToken } from "../utils/jwt.js";
import prisma from "../config/prisma.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: "USER" | "ADMIN";
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  };
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    let decoded;

    try {
      decoded = verifyToken(token);
    } catch {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User account not found",
      });
      return;
    }

    if (user.status !== "ACTIVE") {
      res.status(403).json({
        success: false,
        message: "Your account is not active",
      });
      return;
    }

    (req as AuthenticatedRequest).user = user;

    next();

  } catch (error) {
    next(error);
  }
};
