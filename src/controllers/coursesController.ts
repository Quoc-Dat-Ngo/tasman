import type { Request, Response, NextFunction } from "express";
import type { Course } from "../types";

import {
  allCourse,
  addCourse,
  getCourse,
  modifyCourse,
  removeCourse,
  getStudent,
  getInstructor,
  getDepartment,
} from "../services/coursesService";

const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const courses: Course[] = await allCourse(req.query);
    res.status(200).json({
      status: "success",
      data: courses,
    });
  } catch (e) {
    next(e);
  }
};
const createNewCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const course: Course[] = await addCourse(req.body);
    res.status(201).json({
      status: "success",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};
const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await getCourse(id);
    // notFoundCheck(course); // 404 check
    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};
const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await modifyCourse(id, req.body);
    // notFoundCheck(course); // 404 check
    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};
const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await removeCourse(id);
    // notFoundCheck(course); // 404 check
    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (e) {
    next(e);
  }
};
const getAllCourseStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const student = await getStudent(id);
    // notFoundCheck(student); // 404 check
    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (e) {
    next(e);
  }
};
const getAllCourseInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const instructor = await getInstructor(id);
    // notFoundCheck(instructor); // 404 check
    res.status(200).json({
      status: "success",
      data: instructor,
    });
  } catch (e) {
    next(e);
  }
};
const getCourseDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const department = await getDepartment(id);
    // notFoundCheck(department); // 404 check
    res.status(200).json({
      status: "success",
      data: department,
    });
  } catch (e) {
    next(e);
  }
};

export {
  getAllCourse,
  createNewCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getAllCourseStudent,
  getAllCourseInstructor,
  getCourseDepartment,
};
