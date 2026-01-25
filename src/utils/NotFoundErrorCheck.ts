import type {
  Course,
  Department,
  Enrollment,
  Major,
  Student,
  StudentMajor,
} from "../types";
import AppError from "./AppError";

type NotFoundReturnType =
  | Student[]
  | Course[]
  | Department[]
  | Enrollment[]
  | Major[]
  | StudentMajor[];

export const notFoundCheck = (result: NotFoundReturnType): void => {
  if (result.length === 0) {
    throw new AppError(`Cannot Find Resources`, 404);
  }
};
