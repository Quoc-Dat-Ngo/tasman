import * as z from "zod";
import { ParamsSchema } from "./common.schemas";

export { ParamsSchema };

const DepartmentBaseSchema = z.object({
  department_name: z.string().trim().min(1),
});

export const CreateDepartmentSchema = DepartmentBaseSchema;

export const UpdateDepartmentSchema = DepartmentBaseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be updated" },
);

