const mysql = require("mysql2");
import dotenv = require("dotenv");

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const db = mysql.createPool({
  host: getRequiredEnv("DB_HOST"),
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

export default db;