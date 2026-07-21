import type { Request, Response } from "express";
import {
  registerMajorService,
  removeRegisterMajorService,
} from "../../services/students/studentMajor.services.js";

async function registerMajorController(req: Request, res: Response) {
  const data = await registerMajorService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
}

async function removeRegisterMajorController(req: Request, res: Response) {
  const data = await removeRegisterMajorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
}

export { registerMajorController, removeRegisterMajorController };
