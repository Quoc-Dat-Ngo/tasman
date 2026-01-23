import { pool } from "../database/pool";
import type { Course, CreateCourseDTO, UpdateCourseDTO } from "../types";

const getAllCourse = async () => {};
const createNewCourse = async (body: CreateCourseDTO): Promise<Course> => {
  const result = await pool.query(
    `
    INSERT INTO courses (course_title, course_code, fee, department_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [body.course_title, body.course_code, body.fee, body.department_id],
  );

  return result.rows[0];
};
const getSingleCourse = async () => {};
const updateCourse = async () => {};
const deleteCourse = async () => {};
const getAllCourseStudent = async () => {};
const getAllCourseMajor = async () => {};
const getAllCourseInstructor = async () => {};
const getCourseDepartment = async () => {};

export {
  getAllCourse as allCourse,
  createNewCourse as addCourse,
  getSingleCourse as getCourse,
  updateCourse as modifyCourse,
  deleteCourse as removeCourse,
  getAllCourseStudent as getStudent,
  getAllCourseMajor as getMajor,
  getAllCourseInstructor as getInstructor,
  getCourseDepartment as getDepartment,
};
