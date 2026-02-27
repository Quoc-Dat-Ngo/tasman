import type { Request, Response } from "express";
import { createNewPermissionService } from "./permission.services";

async function createNewPermissionController(req: Request, res: Response) {
  const permission = await createNewPermissionService(req.body);
  res.status(201).json({
    success: true,
    data: permission,
  });
}

export { createNewPermissionController };
