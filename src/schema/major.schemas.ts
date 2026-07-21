import * as z from "zod";
import {
  IDSchema,
  ParamsSchema,
  PaginationQuerySchema,
} from "./common.schemas.js";

export { ParamsSchema, PaginationQuerySchema };

const MajorBaseSchema = z.object({
  major_name: z.string().trim().min(1),
  department_id: z.coerce.number().int().positive(),
});

export const CreateMajorSchema = MajorBaseSchema;

export const UpdateMajorSchema = MajorBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be updated" },
);

export const MajorQuerySchema = PaginationQuerySchema;

