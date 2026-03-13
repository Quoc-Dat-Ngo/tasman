import type { Request, Response } from "express";
import { createUserService } from "./admin.services";
import type { AdminBodySchema } from "./admin.schema";
import type { ValidatedRequest } from "../../middlewares/validator";

type CreateUserRequest = ValidatedRequest<typeof AdminBodySchema>;

export async function createUserController(req: Request, res: Response) {
  const { body } = (req as CreateUserRequest).validated;
  res.status(201).json({
    success: true,
    data: await createUserService(body),
  });
}
