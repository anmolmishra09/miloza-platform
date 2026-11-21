import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

// All profile routes require authentication
router.use(authenticate);

// GET /api/v1/profile
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile routes working successfully",
  });
});

export default router;