import type { Request, Response, NextFunction } from "express";
import {
  getAllDepartmentService,
  getSingleDepartmentService,
  createNewDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
  getDepartmentCourseService,
  getDepartmentInstructorService,
  getDepartmentMajorService,
} from "../services/department.services";

const getAllDepartmentController = async (res: Response) => {
  const data = await getAllDepartmentService();
  res.status(200).json({
    success: true,
    data,
  });
};
const createNewDepartmentController = async (req: Request, res: Response) => {
  const data = await createNewDepartmentService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
};
const getSingleDepartmentController = async (req: Request, res: Response) => {
  const data = await getSingleDepartmentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const updateDepartmentController = async (req: Request, res: Response) => {
  const data = await updateDepartmentService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data,
  });
};
const deleteDepartmentController = async (req: Request, res: Response) => {
  const data = await deleteDepartmentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getDepartmentCourseController = async (req: Request, res: Response) => {
  const data = await getDepartmentCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getDepartmentInstructorController = async (
  req: Request,
  res: Response,
) => {
  const data = await getDepartmentInstructorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getDepartmentMajorController = async (req: Request, res: Response) => {
  const data = await getDepartmentMajorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
export {
  getAllDepartmentController,
  createNewDepartmentController,
  getSingleDepartmentController,
  updateDepartmentController,
  deleteDepartmentController,
  getDepartmentCourseController,
  getDepartmentInstructorController,
  getDepartmentMajorController,
};
