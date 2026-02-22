import type { Request, Response, NextFunction } from "express";
import {
  createNewStudentService,
  deleteStudentService,
  getAllStudentService,
  getSingleStudentService,
  getStudentCourseService,
  getStudentMajorService,
  updateStudentService,
} from "../../services/students/student.services";

const getAllStudentController = async (req: Request, res: Response) => {
  const data = await getAllStudentService(req.query);
  res.status(200).json({
    success: true,
    data,
  });
};
const createNewStudentController = async (req: Request, res: Response) => {
  const data = await createNewStudentService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
};
const getSingleStudentController = async (req: Request, res: Response) => {
  const data = await getSingleStudentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const updateStudentController = async (req: Request, res: Response) => {
  const data = await updateStudentService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data,
  });
};
const deleteStudentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await deleteStudentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
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
const getStudentCourseController = async (req: Request, res: Response) => {
  const data = await getStudentCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getStudentMajorController = async (req: Request, res: Response) => {
  const data = await getStudentMajorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
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
