import * as z from "zod";

export const IDSchema = z.string().trim().min(1);

export const ParamsSchema = z.object({
  id: IDSchema,
});

export const PaginationQuerySchema = z.object({
  // limit: z.coerce.number().int().positive().min(10).max(50).optional(),
  // offset: z.coerce.number().int().min(0).optional(),
  limit: z.string().trim().min(1).optional(),
  offset: z.string().trim().min(1).optional(),
  sort: z.string().trim().min(2).optional(),
});

