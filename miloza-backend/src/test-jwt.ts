
import "dotenv/config";

import {
  generateToken,
  verifyToken,
} from "./utils/jwt.js";

const testJWT = () => {
  try {
    const token = generateToken(101);

    console.log("Generated Token:", token);

    const decoded = verifyToken(token);

    console.log("Decoded User ID:", decoded.userId);

    console.log("JWT TEST SUCCESSFUL");
  } catch (error) {
    console.error("JWT TEST FAILED:", error);
  }
};

testJWT();
