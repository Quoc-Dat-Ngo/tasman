import type { Response, NextFunction } from "express";

export function controllerHandler<T>(
  fn: () => Promise<T>,
  res: Response,
  next: NextFunction,
  statusCode = 200,
): void {
  fn()
    .then((data) => {
      res.status(statusCode).json({
        success: true,
        data,
      });
    })
    .catch(next);
}
