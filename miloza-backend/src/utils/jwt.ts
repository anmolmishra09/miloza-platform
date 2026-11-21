
import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is missing in environment variables"
  );
}

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN || "15m") as SignOptions["expiresIn"];

export interface JwtPayload {
  userId: number;
}

export const generateToken = (
  userId: number
): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: "HS256",
    }
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {
  const decoded = jwt.verify(
    token,
    JWT_SECRET,
    {
      algorithms: ["HS256"],
    }
  );

  if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "number"
  ) {
    throw new Error("Invalid JWT payload");
  }

  return {
    userId: decoded.userId,
  };
};
