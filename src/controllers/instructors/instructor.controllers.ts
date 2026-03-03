import type { Response, Request } from "express";

import {
  getAllInstructorService,
  getSingleInstructorService,
  createNewInstructorService,
  updateInstructorService,
  deleteInstructorService,
  getInstructorCourseService,
  getInstructorDepartmentService,
} from "../../services/instructors/instructor.services";

const getAllInstructorController = async (req: Request, res: Response) => {
  const data = await getAllInstructorService(req.query);
  res.status(201).json({
    success: true,
    data,
  });
};
const createNewInstructorController = async (req: Request, res: Response) => {
  const data = await createNewInstructorService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
};
const getSingleInstructorController = async (req: Request, res: Response) => {
  const data = await getSingleInstructorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const updateInstructorController = async (req: Request, res: Response) => {
  const data = await updateInstructorService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data,
  });
};
const deleteInstructorController = async (req: Request, res: Response) => {
  const data = await deleteInstructorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getInstructorCourseController = async (req: Request, res: Response) => {
  const data = await getInstructorCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getInstructorDepartmentController = async (
  req: Request,
  res: Response,
) => {
  const data = await getInstructorDepartmentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

export {
  getAllInstructorController,
  createNewInstructorController,
  getSingleInstructorController,
  updateInstructorController,
  deleteInstructorController,
  getInstructorCourseController,
  getInstructorDepartmentController,
};
