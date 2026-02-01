import type { Request, Response, NextFunction } from "express";
import type { Department, Major, Student } from "../types";
import {
  allMajor,
  newMajor,
  singleMajor,
  modifyMajor,
  removeMajor,
  getDeparment,
  getStudent,
} from "../services/majorsService";

const getAllMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const major: Major[] = await allMajor(req.query);
    res.status(200).json({ success: true, data: major });
  } catch (e) {
    next(e);
  }
};
const createNewMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const major: Major[] = await newMajor(req.body);
    res.status(201).json({ success: true, data: major });
  } catch (e) {
    next(e);
  }
};
const getSingleMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const major: Major[] = await singleMajor(req.params.id);
    res.status(200).json({ success: true, data: major });
  } catch (e) {
    next(e);
  }
};
const updateMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const major: Major[] = await modifyMajor(req.params.id, req.body);
    res.status(200).json({ success: true, data: major });
  } catch (e) {
    next(e);
  }
};
const deleteMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const major: Major[] = await removeMajor(req.params.id);
    res.status(200).json({ success: true, data: major });
  } catch (e) {
    next(e);
  }
};
const getAllMajorStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const students: Student[] = await getStudent(req.params.id);
    res.status(200).json({ success: true, data: students });
  } catch (e) {
    next(e);
  }
};
const getMajorDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const department: Department[] = await getDeparment(req.params.id);
    res.status(200).json({ success: true, data: department });
  } catch (e) {
    next(e);
  }
};

export {
  getAllMajor,
  createNewMajor,
  getSingleMajor,
  updateMajor,
  deleteMajor,
  getAllMajorStudent,
  getMajorDepartment,
};
