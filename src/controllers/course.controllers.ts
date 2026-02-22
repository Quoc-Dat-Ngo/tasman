import type { Request, Response, NextFunction } from "express";

import {
  getAllCourseService,
  getSingleCourseService,
  createNewCourseService,
  updateCourseService,
  deleteCourseService,
  getCourseStudentService,
  getCourseInstructorService,
  getCourseDepartmentService,
} from "../services/course.services";

const getAllCourseController = async (req: Request, res: Response) => {
  const data = await getAllCourseService(req.query);
  res.status(200).json({
    success: true,
    data,
  });
};
const createNewCourseController = async (req: Request, res: Response) => {
  const data = await createNewCourseService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
};
const getSingleCourseController = async (req: Request, res: Response) => {
  const data = await getSingleCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const updateCourseController = async (req: Request, res: Response) => {
  const data = await updateCourseService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data,
  });
};
const deleteCourseController = async (req: Request, res: Response) => {
  const data = await deleteCourseService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getCourseStudentController = async (req: Request, res: Response) => {
  const data = await getCourseStudentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getCourseInstructorController = async (req: Request, res: Response) => {
  const data = await getCourseInstructorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getCourseDepartmentController = async (req: Request, res: Response) => {
  const data = await getCourseDepartmentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

export {
  getAllCourseController,
  createNewCourseController,
  getSingleCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseStudentController,
  getCourseInstructorController,
  getCourseDepartmentController,
};
