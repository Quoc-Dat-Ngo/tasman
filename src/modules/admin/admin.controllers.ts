import type { Request, Response } from "express";
import { createUserService } from "./admin.services";
import { z } from "zod";
import type { AdminBodySchema } from "./admin.schema";
import type { ValidatedRequest } from "../../middlewares/validator";

export async function createUserController(
  req: ValidatedRequest<typeof AdminBodySchema>,
  res: Response,
) {
  res.status(201).json({
    success: true,
    data: await createUserService(req.validated.body),
  });
}
