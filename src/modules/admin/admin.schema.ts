import * as z from "zod";

export const AdminBody = z.object({
  user_email: z.email(),
  user_password: z.coerce.string().trim().min(10),
  role_id: z.coerce.number().int().min(1),
  linked_student_id: z.coerce
    .number()
    .int()
    .min(1)
    .nullable()
    .optional()
    .default(null),
  linked_instructor_id: z.coerce
    .number()
    .int()
    .min(1)
    .nullable()
    .optional()
    .default(null),
});
