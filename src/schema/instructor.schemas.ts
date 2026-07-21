import * as z from "zod";
import {
  IDSchema,
  ParamsSchema,
  PaginationQuerySchema,
} from "./common.schemas.js";

export { ParamsSchema, PaginationQuerySchema };

const InstructorBaseSchema = z.object({
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  dob: z.coerce.date(),
  gender: z.enum(["M", "F"]),
  department_id: z.coerce.number().int().positive(),
});

export const CreateInstructorSchema = InstructorBaseSchema;

export const UpdateInstructorSchema = InstructorBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be updated" },
);

export const InstructorQuerySchema = PaginationQuerySchema;

