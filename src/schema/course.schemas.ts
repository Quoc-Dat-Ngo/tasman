import * as z from "zod";
import {
  IDSchema,
  ParamsSchema,
  PaginationQuerySchema,
} from "./common.schemas.js";

export { ParamsSchema, PaginationQuerySchema };

const CourseBaseSchema = z.object({
  course_title: z.string().trim().min(1),
  course_code: z.string().trim().min(1),
  fee: z.coerce.number().positive(),
  department_id: z.coerce.number().int().positive(),
});

export const CreateCourseSchema = CourseBaseSchema;

export const UpdateCourseSchema = CourseBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be updated" },
);

export const CourseQuerySchema = PaginationQuerySchema;

