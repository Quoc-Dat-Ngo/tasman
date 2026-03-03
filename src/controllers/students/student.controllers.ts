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

export {
  getAllStudentController,
  createNewStudentController,
  getSingleStudentController,
  updateStudentController,
  deleteStudentController,
  getStudentCourseController,
  getStudentMajorController,
};
