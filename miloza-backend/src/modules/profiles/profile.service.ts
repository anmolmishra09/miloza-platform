import prisma from "../../config/prisma.js";

import { AuthError } from "../auth/auth.errors.js";

export const getProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new AuthError(404, "User not found");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    profile: user.profile,
  };
};