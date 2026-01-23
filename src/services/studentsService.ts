import type { Request, Response } from "express";
import type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  IDType,
} from "../types/";
import { pool } from "../database/pool";
import { notFoundCheck } from "../utils/NotFoundErrorCheck";
import { updateTable } from "../utils/updateTable";

const getAllStudent = async (): Promise<Student[]> | never => {
  try {
    const result = await pool.query(
      `
      SELECT * 
      FROM students;`,
    );
    return result.rows;
  } catch (e) {
    throw e;
  }
};
const createNewStudent = async (
  body: CreateStudentDTO,
): Promise<Student> | never => {
  try {
    const result = await pool.query(
      `
      INSERT INTO students (first_name, last_name, dob, gender) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;`,
      [body.first_name, body.last_name, body.dob, body.gender],
    );
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};
const getSingleStudent = async (id: IDType): Promise<Student> | never => {
  try {
    const result = await pool.query(
      `
      SELECT * 
      FROM students 
      WHERE student_id = $1;`,
      [id],
    );
    // Error check for 404 - Not Found
    notFoundCheck(result.rows);
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};
const updateStudent = async (
  body: UpdateStudentDTO,
  id: IDType,
): Promise<Student> | never => {
  try {
    // Using helper function to enhance redability and maintainability
    let { fields, values, index } = updateTable(body, id);
    const result = await pool.query(
      `
      UPDATE students
      SET ${fields.join(", ")}
      WHERE student_id = $${index++}
      RETURNING *;
      `,
      values,
    );
    // Error check for 404 - Not Found
    notFoundCheck(result.rows);
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};
const deleteStudent = async (id: IDType) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM students
      WHERE student_id = $1
      RETURNING *;`,
      [id],
    );
    // Error check for 404 - Not Found
    notFoundCheck(result.rows);
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};
const enrollCourse = async (student_id: IDType, course_id: IDType) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *;`,
      [student_id, course_id],
    );
    // Error check for 404 - Not Found
    notFoundCheck(result.rows);
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};
const getAllStudentCourse = async (id: IDType) => {
  try {
    const result = await pool.query(
      `
      SELECT FROM students
      WHERE student_id = $1
      RETURNING *;`,
      [id],
    );
    // Error check for 404 - Not Found
    notFoundCheck(result.rows);
    return result.rows[0];
  } catch (e) {
    throw e;
  }
};
const getAllStudentMajor = async (id: IDType) => {};

export {
  getAllStudent as studentList,
  createNewStudent as addStudent,
  getSingleStudent as studentInfo,
  updateStudent as updateInfo,
  deleteStudent as removeInfo,
  enrollCourse as registerCourse,
  getAllStudentCourse as getCourse,
  getAllStudentMajor as getMajor,
};
