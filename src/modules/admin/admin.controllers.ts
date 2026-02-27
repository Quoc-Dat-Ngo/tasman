import type { Request, Response } from "express";
import { createUserService } from "./admin.services";

export async function createUserController(req: Request, res: Response) {
  res.status(201).json({
    success: true,
    data: await createUserService(req.body),
  });
}
