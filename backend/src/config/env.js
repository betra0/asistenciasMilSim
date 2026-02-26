import dotenv from "dotenv";

dotenv.config({ path: './.env' });


function required(name) {
  if (!process.env[name]) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return process.env[name];
}

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  db: {
    url: required("DATABASE_URL"),
  },
  admin:{
    name: required("ADMIN_USERNAME"),
    hash: required("ADMIN_HASH"),
  },

  jwtSecret: required("JWT_SECRET"),
};