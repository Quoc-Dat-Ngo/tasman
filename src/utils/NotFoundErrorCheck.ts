import AppError from "./AppError";
import type { Student } from "../types";

export const notFoundCheck = (result: Student[]): void => {
  if (result.length === 0) {
    throw new AppError(`Cannot find resources`, 404);
  }
};
