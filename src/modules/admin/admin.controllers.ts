import type { Request, Response } from "express";
import { createUserService } from "./admin.services";
import { z } from "zod";
import type { AdminBody } from "./admin.schema";

export async function createUserController(req: Request, res: Response) {
  const body = req.validated?.body as z.infer<typeof AdminBody>;
  res.status(201).json({
    success: true,
    data: await createUserService(body),
  });
}
