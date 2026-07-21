import type { Request, Response } from "express";
import {
  getAllMajorService,
  getSingleMajorService,
  createNewMajorService,
  updateMajorService,
  deleteMajorService,
  getMajorStudentService,
  getMajorDepartmentService,
} from "../services/major.services.js";

const getAllMajorController = async (req: Request, res: Response) => {
  const data = await getAllMajorService(req.query);
  res.status(200).json({
    success: true,
    data,
  });
};
const createNewMajorController = async (req: Request, res: Response) => {
  const data = await createNewMajorService(req.body);
  res.status(201).json({
    success: true,
    data,
  });
};
const getSingleMajorController = async (req: Request, res: Response) => {
  const data = await getSingleMajorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const updateMajorController = async (req: Request, res: Response) => {
  const data = await updateMajorService(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data,
  });
};
const deleteMajorController = async (req: Request, res: Response) => {
  const data = await deleteMajorService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getMajorStudentController = async (req: Request, res: Response) => {
  const data = await getMajorStudentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};
const getMajorDepartmentController = async (req: Request, res: Response) => {
  const data = await getMajorDepartmentService(req.params.id);
  res.status(200).json({
    success: true,
    data,
  });
};

export {
  getAllMajorController,
  createNewMajorController,
  getSingleMajorController,
  updateMajorController,
  deleteMajorController,
  getMajorStudentController,
  getMajorDepartmentController,
};
