import AppError from "./AppError";

export function assertFound<T>(
  value: T | null,
  message = "Resource not found",
): T {
  if (!value) throw new AppError(message, 404);
  return value;
}
