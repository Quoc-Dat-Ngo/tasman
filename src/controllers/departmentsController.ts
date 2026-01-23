import type { Request, Response, NextFunction } from "express";
import {
  allDepartment,
  newDeparment,
  singleDepartment,
  modifyDepartment,
  removeDepartment,
  getCourse,
  getInstructor,
  getMajor,
} from "../services/departmentsService";

const getAllDepartment = async () => {};
const createNewDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deparments = await newDeparment(req.body);
    res.status(201).json({ status: "success", data: deparments });
  } catch (e) {
    next(e);
  }
};
const getSingleDepartment = async () => {};
const updateDepartment = async () => {};
const deleteDepartment = async () => {};
const getAllDepartmentCourse = async () => {};
const getAllDepartmentInstructor = async () => {};
const getAllDepartmentMajor = async () => {};

export {
  getAllDepartment,
  createNewDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartmentCourse,
  getAllDepartmentInstructor,
  getAllDepartmentMajor,
};
