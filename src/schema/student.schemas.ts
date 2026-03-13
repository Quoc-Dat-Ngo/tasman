import * as z from "zod";

const IDSchema = z.string().trim().min(1);
export const ParamsSchema = z.object({
  id: IDSchema,
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
