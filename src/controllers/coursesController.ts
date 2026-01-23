import type { Request, Response, NextFunction } from "express";

import {
  allCourse,
  addCourse,
  getCourse,
  modifyCourse,
  removeCourse,
  getStudent,
  getMajor,
  getInstructor,
  getDepartment,
} from "../services/coursesService";

const getAllCourse = async () => {};
const createNewCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course = await addCourse(req.body);
    res.status(201).json({
      status: "success",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};
const getSingleCourse = async () => {};
const updateCourse = async () => {};
const deleteCourse = async () => {};
const getAllCourseStudent = async () => {};
const getAllCourseMajor = async () => {};
const getAllCourseInstructor = async () => {};
const getCourseDepartment = async () => {};

export {
  getAllCourse,
  createNewCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getAllCourseStudent,
  getAllCourseMajor,
  getAllCourseInstructor,
  getCourseDepartment,
};
