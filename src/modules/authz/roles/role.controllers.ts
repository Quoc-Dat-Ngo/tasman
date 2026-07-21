import type { Request, Response } from "express";

import { createNewRoleService } from "./role.services.js";

async function createNewRoleController(req: Request, res: Response) {
  const { role_name } = req.body;
  const role = await createNewRoleService(role_name);

  res.status(201).json({
    sucess: true,
    data: role,
  });
}

export { createNewRoleController };
