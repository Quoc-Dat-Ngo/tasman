import "dotenv/config";
import { Env } from "./env.schema";

const validatedEnv = Env.parse(process.env);

export const env = {
  DATABASE_URL: validatedEnv.DATABASE_URL,
  PORT: validatedEnv.PORT,
  ACCESS_KEY: validatedEnv.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_KEY: validatedEnv.REFRESH_TOKEN_SECRET_KEY,
};
