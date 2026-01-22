import type { Request, Response, NextFunction } from "express";

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
}

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Student[]> | never => {
  try {
    const data = await 
  } catch (e) {
    next(e);
  }
};
const createNewStudent = async () => {};
const getSingleStudent = async () => {};
const updateStudent = async () => {};
const deleteStudent = async () => {};
const getAllStudentCourse = async () => {};
const getAllStudentMajor = async () => {};

export {
  getAllStudent,
  createNewStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getAllStudentCourse,
  getAllStudentMajor,
};
