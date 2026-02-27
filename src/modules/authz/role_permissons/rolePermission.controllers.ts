import type { Request, Response } from "express";
import { createRolePermissionService } from "./rolePermission.services";

export async function createRolePermissionController(
  req: Request,
  res: Response,
) {
  res.status(201).json({
    success: true,
    data: await createRolePermissionService(req.body),
  });
}
