import * as z from "zod";

export const EnvSchema = z.object({
  DATABASE_URL: z.string().trim().min(1),
  PORT: z.coerce.number().int().min(1).max(65535).default(3004),
  ACCESS_TOKEN_SECRET_KEY: z.string().trim().min(10),
  REFRESH_TOKEN_SECRET_KEY: z.string().trim().min(10),
});
