import type { Request, Response, NextFunction } from "express";
import type { Major } from "../types";
import {
  allMajor,
  newMajor,
  singleMajor,
  modifyMajor,
  removeMajor,
  getCourse,
  getDeparment,
  getStudent,
} from "../services/majorsService";

const getAllMajor = async () => {};
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
const getSingleMajor = async () => {};
const updateMajor = async () => {};
const deleteMajor = async () => {};
const getAllMajorCourse = async () => {};
const getAllMajorStudent = async () => {};
const getMajorDepartment = async () => {};

export {
  getAllMajor,
  createNewMajor,
  getSingleMajor,
  updateMajor,
  deleteMajor,
  getAllMajorCourse,
  getAllMajorStudent,
  getMajorDepartment,
};
