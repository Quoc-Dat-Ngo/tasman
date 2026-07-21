import type { Response, Request } from "express";
import {
  registerCourseService,
  removeRegisterCourseService,
} from "../../services/instructors/instructorCourse.services.js";

const registerCourseController = async (req: Request, res: Response) => {
  const data = await registerCourseService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
};
const removeRegisterCourseController = async (req: Request, res: Response) => {
  const data = await removeRegisterCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

export { registerCourseController, removeRegisterCourseController };
