import * as z from "zod";
import {
  IDSchema,
  ParamsSchema,
  PaginationQuerySchema,
} from "./common.schemas";

export const StudentQuerySchema = PaginationQuerySchema.extend({
  first_name: z.string().trim().min(1).optional(),
  last_name: z.string().trim().min(1).optional(),
  dob: z.string().trim().min(1).optional(),
  gender: z.enum(["M", "F"]).optional(),
});

const StudentBaseSchema = z.object({
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  dob: z.coerce.date(),
  gender: z.enum(["M", "F"]),
});
export const CreateStudentSchema = StudentBaseSchema;
export const UpdateStudentSchema = StudentBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be updated" },
);

const EnrollmentBodySchema = z.object({
  student_id: IDSchema,
  course_id: IDSchema,
});

const StudentMajorBodySchema = z.object({
  student_id: IDSchema,
  major_id: IDSchema,
});
