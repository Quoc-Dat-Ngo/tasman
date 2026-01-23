import type { Response, Request, NextFunction } from "express";
import AppError from "../utils/AppError";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(err);
  if (err instanceof AppError && err.isOperational) {
    // Safe to send to client
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
