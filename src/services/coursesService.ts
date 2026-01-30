import { pool } from "../database/pool";
import type {
  Course,
  CreateCourseDTO,
  Department,
  IDType,
  Major,
  Student,
  UpdateCourseDTO,
} from "../types";
import { updateCourseTable } from "../utils/updateTable";

const getAllCourse = async (): Promise<Course[]> => {
  const result = await pool.query<Course>(
    `
    SELECT * 
    FROM courses;
    `,
  );
  return result.rows;
};
const createNewCourse = async (body: CreateCourseDTO): Promise<Course[]> => {
  const result = await pool.query<Course>(
    `
    INSERT INTO courses (course_title, course_code, fee, department_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [body.course_title, body.course_code, body.fee, body.department_id],
  );

  return result.rows;
};
const getSingleCourse = async (id: IDType): Promise<Course[]> => {
  const result = await pool.query<Course>(
    `
    SELECT * 
    FROM courses
    WHERE course_id = $1;
    `,
    [id],
  );
  return result.rows;
};
const updateCourse = async (
  id: IDType,
  body: UpdateCourseDTO,
): Promise<Course[]> => {
  const { fields, values, index } = updateCourseTable(body, id);
  const result = await pool.query<Course>(
    `
    UPDATE courses 
    SET ${fields.join(", ")} 
    WHERE course_id = $${index}
    RETURNING *;
    `,
    values,
  );
  return result.rows;
};
const deleteCourse = async (id: IDType): Promise<Course[]> => {
  const result = await pool.query<Course>(
    `
    DELETE FROM courses
    WHERE course_id = $1
    RETURNING *;
    `,
    [id],
  );
  return result.rows;
};
const getAllCourseStudent = async (id: IDType): Promise<Student[]> => {
  const result = await pool.query<Student>(
    `
    SELECT s.first_name, s.last_name
    FROM students as s
    JOIN enrollments as e
    ON e.student_id = s.student_id
    WHERE e.course_id = $1
    `,
    [id],
  );
  return result.rows;
};
const getAllCourseInstructor = async (id: IDType) => {
  const result = await pool.query(
    `
    SELECT i.major_name
    FROM instructors as i
    JOIN course_instructor as ci
    ON ci.instructor_id = m.instructor_id
    WHERE ci.course_id = $1
    `,
    [id],
  );
  return result.rows;
};
const getCourseDepartment = async (id: IDType): Promise<Department[]> => {
  const result = await pool.query(
    `
    SELECT d.department_name
    FROM departments as d
    JOIN courses as c
    ON c.department_id = d.department_id
    WHERE c.course_id = $1
    `,
    [id],
  );
  return result.rows;
};

export {
  getAllCourse as allCourse,
  createNewCourse as addCourse,
  getSingleCourse as getCourse,
  updateCourse as modifyCourse,
  deleteCourse as removeCourse,
  getAllCourseStudent as getStudent,
  getAllCourseInstructor as getInstructor,
  getCourseDepartment as getDepartment,
};
