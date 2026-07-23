import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});
