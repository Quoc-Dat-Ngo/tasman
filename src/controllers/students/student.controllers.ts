import type { Request, Response, NextFunction } from "express";
import {
  createNewStudentService,
  deleteStudentService,
  getAllStudentService,
  getSingleStudentService,
  getStudentCourseService,
  getStudentMajorService,
  updateStudentService,
} from "../../services/student.services";
import { controllerHandler } from "../helpers/controllerHandler";

const getAllStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getAllStudentService(req.query), res, next);
};
const createNewStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => createNewStudentService(req.body), res, next, 201);
};
const getSingleStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  controllerHandler(() => getSingleStudentService(id), res, next);
};
const updateStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  controllerHandler(() => updateStudentService(id, req.body), res, next);
};
const deleteStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  controllerHandler(() => deleteStudentService(id), res, next);
};
// const enrollCourseController = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   const { id } = req.params;
//   const { course_id } = req.body;
//   try {
//     const enrollment: Enrollment[] = await registerCourse(id, course_id);
//     // Error check for 404 - Not Found
//     res.status(201).json({
//       success: true,
//       data: enrollment,
//     });
//   } catch (e) {
//     next(e);
//   }
// };
const getStudentCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  controllerHandler(() => getStudentCourseService(id), res, next);
};
const getStudentMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  controllerHandler(() => getStudentMajorService(id), res, next);
};

// const registerMajor = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   const { id } = req.params;
//   const { major_id } = req.body;
//   try {
//     const major: StudentMajor[] = await majorRegistration(id, major_id);
//     // Error check for 404 - Not Found
//     res.status(201).json({
//       success: true,
//       data: major,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

export {
  getAllStudentController,
  createNewStudentController,
  getSingleStudentController,
  updateStudentController,
  deleteStudentController,
  getStudentCourseController,
  getStudentMajorController,
};
