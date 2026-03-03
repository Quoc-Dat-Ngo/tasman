import type { Response, Request, NextFunction } from "express";
import AppError from "../errors/AppError";

export const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError && err.isOperational) {
    // Expected Error
    // Safe to send to client
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    // Unexpected error
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
