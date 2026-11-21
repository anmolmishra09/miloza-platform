import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getProfile,
} from "./profile.service.js";

export const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = (req as Request & {
      user: { userId: number };
    }).user;

    const profile = await getProfile(userId);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};