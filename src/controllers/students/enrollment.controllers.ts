import type { Request, Response, NextFunction } from "express";
import {
  enrollCourseService,
  removeEnrollCourseService,
} from "../../services/students/enrollment.services";

async function enrollCourseController(req: Request, res: Response) {
  const data = await enrollCourseService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
}

async function removeEnrollCourseController(req: Request, res: Response) {
  const data = await removeEnrollCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
}

export { enrollCourseController, removeEnrollCourseController };
