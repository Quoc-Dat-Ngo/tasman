import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  // Custom handler to return structured JSON
  handler: (req, res, next) => {
    res.status(429).json({
      status: "error",
      message: "Too many requests, please try again later",
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});
