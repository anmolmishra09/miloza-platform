
import "dotenv/config";

import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = Number(process.env.PORT) || 5000;

let server: ReturnType<typeof app.listen> | undefined;

const startServer = async () => {
  try {
    // Connect to MySQL database
    await prisma.$connect();

    console.log("MySQL Database Connected Successfully");

    // Start Express server
    server = app.listen(PORT, () => {
      console.log(
        `MILOZA API running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Server startup failed:", error);

    await prisma.$disconnect();
    process.exit(1);
  }
};

// Graceful shutdown
interface ShutdownHandler {
  (signal: NodeJS.Signals): Promise<void>;
}

const shutdown: ShutdownHandler = async (signal: NodeJS.Signals): Promise<void> => {
  console.log(`\n${signal} received. Shutting down MILOZA server...`);

  if (server) {
    server.close(async () => {
      console.log("HTTP Server closed successfully");

      try {
        await prisma.$disconnect();
        console.log("MySQL Database disconnected successfully");

        process.exit(0);
      } catch (error: unknown) {
        console.error("Database disconnection failed:", error);
        process.exit(1);
      }
    });
  } else {
    await prisma.$disconnect();
    process.exit(0);
  }
};

// Handle shutdown signals
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Start application
startServer();
