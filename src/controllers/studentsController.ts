import type { Request, Response, NextFunction } from "express";
import {
  studentList,
  addStudent,
  studentInfo,
  updateInfo,
  removeInfo,
  registerCourse,
  getCourse,
  getMajor,
} from "../services/studentsService";

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const students = await studentList();
    res
      .status(200)
      .json({ message: "Successfully retrieve all students", data: students });
  } catch (e) {
    next(e);
  }
};
const createNewStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const student = await addStudent(req.body);
    res
      .status(201)
      .json({ message: "Successfully created new student", data: student });
  } catch (e) {
    next(e);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const info = await studentInfo(id);
    res.status(200).json({
      message: `Successfully get info of student with id #${id}`,
      data: info,
    });
  } catch (e) {
    next(e);
  }
};
const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const student = await updateInfo(req.body, id);
    res.status(200).json({
      message: `Successfully update info of student with id #${id}`,
      data: student,
    });
  } catch (e) {
    next(e);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const student = await removeInfo(id);
    res.status(200).json({
      message: `Successfully remove info of student with id #${id}`,
      data: student,
    });
  } catch (e) {
    next(e);
  }
};
const enrollCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  const { course_id } = req.body;
  try {
    const enrollment = await registerCourse(id, course_id);
    res.status(201).json({
      message: `Successfully enrolled student with id #${id} into course with id #${course_id}`,
      data: enrollment,
    });
  } catch (e) {
    next(e);
  }
};
const getAllStudentCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  try {
    const course = await getCourse(id);
    res.status(200).json({
      message: `Successfully get all courses that student with id #${id} enrolled`,
      data: course,
    });
  } catch (e) {
    next(e);
  }
};
const getAllStudentMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {};

export {
  getAllStudent,
  createNewStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  enrollCourse,
  getAllStudentCourse,
  getAllStudentMajor,
};
