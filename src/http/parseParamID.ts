import type { ExpressParamID } from "../types";
import AppError from "../errors/AppError";

export function parseParamID(id: ExpressParamID): string {
  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid request ID when parsing", 400);
  }

  return id;
}
