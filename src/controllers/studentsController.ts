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
  majorRegistration,
} from "../services/studentsService";
import { notFoundCheck } from "../utils/NotFoundErrorCheck";
import type {
  Student,
  Enrollment,
  StudentMajor,
  Course,
  Major,
} from "../types";

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const students: Student[] = await studentList();
    res.status(200).json({ success: true, data: students });
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
    const student: Student[] = await addStudent(req.body);
    res.status(201).json({ success: true, data: student });
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
    const info: Student[] = await studentInfo(id);

    // Error check for 404 - Not Found
    notFoundCheck(info);

    res.status(200).json({
      success: true,
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
    const student: Student[] = await updateInfo(req.body, id);
    // Error check for 404 - Not Found
    notFoundCheck(student);
    res.status(200).json({
      success: true,
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
    const student: Student[] = await removeInfo(id);
    // Error check for 404 - Not Found
    notFoundCheck(student);
    res.status(200).json({
      success: true,
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
    const enrollment: Enrollment[] = await registerCourse(id, course_id);
    // Error check for 404 - Not Found
    notFoundCheck(enrollment);
    res.status(201).json({
      success: true,
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
    const course: Course[] = await getCourse(id);
    // Error check for 404 - Not Found
    notFoundCheck(course);
    res.status(200).json({
      success: true,
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
): Promise<void> => {
  const { id } = req.params;
  try {
    const major: Major[] = await getMajor(id);
    // Error check for 404 - Not Found
    notFoundCheck(major);
    res.status(200).json({
      success: true,
      data: major,
    });
  } catch (e) {
    next(e);
  }
};

const registerMajor = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;
  const { major_id } = req.body;
  try {
    const major: StudentMajor[] = await majorRegistration(id, major_id);
    // Error check for 404 - Not Found
    notFoundCheck(major);
    res.status(201).json({
      success: true,
      data: major,
    });
  } catch (e) {
    next(e);
  }
};

export {
  getAllStudent,
  createNewStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  enrollCourse,
  getAllStudentCourse,
  getAllStudentMajor,
  registerMajor,
};
