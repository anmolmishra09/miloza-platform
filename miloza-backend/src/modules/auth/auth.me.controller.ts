
import type { RequestHandler } from "express";

import type {
  AuthenticatedRequest,
} from "../../middleware/auth.middleware.js";

export const getCurrentUser: RequestHandler = (
  req,
  res
) => {
  const authenticatedReq = req as AuthenticatedRequest;

  res.status(200).json({
    success: true,
    message: "Authenticated user fetched successfully",
    data: {
      user: authenticatedReq.user,
    },
  });
};
