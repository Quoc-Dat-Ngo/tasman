import type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  IDType,
  Enrollment,
  StudentMajor,
  Course,
  Major,
  FilteringByStudent,
  GetStudentMetadata,
} from "../types/";

import { pool } from "../database/pool";
import { updateStudentTable } from "../utils/updateTable";

const getAllStudent = async (
  query: FilteringByStudent,
): Promise<GetStudentMetadata> => {
  const { limit = 10, offset = 0, ...filters } = query;
  const whereClauses: string[] = [];
  const values: (string | undefined)[] = [];
  let index = 1;

  // Allow-list for valid filterable columns
  const allowedFilters = ["first_name", "last_name", "dob", "gender"];

  Object.keys(filters).forEach((key) => {
    if (allowedFilters.includes(key)) {
      if (key === "first_name" || key === "last_name") {
        whereClauses.push(`${key} ILIKE $${index++}`);
        values.push(`${filters[key]}%`);
      } else if (key === "dob") {
        whereClauses.push(`${key} = $${index++}`);
        values.push(filters.dob);
      } else {
        whereClauses.push(`${key} = $${index++}`);
        values.push(filters.gender);
      }
    }
  });

  console.log(whereClauses);

  const whereString =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  console.log(whereString);
  console.log(values);

  /** This is to specify dob to show only the date not the timezone
    * 
    SELECT 
      student_id, 
      first_name, 
      TO_CHAR(dob, 'YYYY-MM-DD') as dob 
    FROM students;
    * 
    */

  // Get paginated data
  const student = await pool.query<Student>(
    `
    SELECT *
    FROM students
    ${whereString}
    LIMIT $${index++}
    OFFSET $${index};
    `,
    [...values, limit, offset],
  );

  // Get total pages
  const totalPages = await pool.query(
    `
    SELECT COUNT(*)
    FROM students
    ${whereString};
    `,
    values,
  );

  return {
    data: student.rows,
    metadata: {
      total_page: parseInt(totalPages.rows[0].count),
      limit,
      offset,
    },
  };
};
const createNewStudent = async (body: CreateStudentDTO): Promise<Student[]> => {
  const result = await pool.query<Student>(
    `
      INSERT INTO students (first_name, last_name, dob, gender) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;`,
    [body.first_name, body.last_name, body.dob, body.gender],
  );
  return result.rows;
};
const getSingleStudent = async (id: IDType): Promise<Student[]> => {
  const result = await pool.query<Student>(
    `
      SELECT * 
      FROM students 
      WHERE student_id = $1;`,
    [id],
  );
  return result.rows;
};
const updateStudent = async (
  body: UpdateStudentDTO,
  id: IDType,
): Promise<Student[]> => {
  // Using helper function to enhance redability and maintainability
  const { fields, values, index } = updateStudentTable(body, id);
  const result = await pool.query<Student>(
    `
      UPDATE students
      SET ${fields.join(", ")}
      WHERE student_id = $${index}
      RETURNING *;
      `,
    values,
  );
  return result.rows;
};
const deleteStudent = async (id: IDType): Promise<Student[]> => {
  const result = await pool.query<Student>(
    `
      DELETE FROM students
      WHERE student_id = $1
      RETURNING *;`,
    [id],
  );

  return result.rows;
};
const enrollCourse = async (
  studentId: IDType,
  courseId: IDType,
): Promise<Enrollment[]> => {
  const result = await pool.query<Enrollment>(
    `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *;`,
    [studentId, courseId],
  );
  return result.rows;
};
const getAllStudentCourse = async (id: IDType): Promise<Course[]> => {
  // Nested queries (multiple subqueries)
  // const result = await pool.query<Student>(
  //   `
  //   SELECT course_code
  //   FROM courses
  //   WHERE course_id IN
  //   (
  //     SELECT course_id
  //     FROM enrollments
  //     WHERE enrollments.student_id = $1
  //   );`,
  //   [id],
  // );

  // SQL JOIN..ON
  const result = await pool.query<Course>(
    `
    SELECT c.course_code
    FROM courses AS c
    JOIN enrollments AS e
    ON e.course_id = c.course_id
    WHERE e.student_id = $1 
    `,
    [id],
  );

  return result.rows;
};
const getAllStudentMajor = async (id: IDType): Promise<Major[]> => {
  const result = await pool.query<Major>(
    `
    SELECT m.major_name
    FROM majors AS m
    JOIN student_major AS sm
    ON sm.major_id = m.major_id
    WHERE sm.student_id = $1 
    `,
    [id],
  );

  return result.rows;
};
const majorRegistration = async (studentId: IDType, majorId: IDType) => {
  const result = await pool.query<StudentMajor>(
    `
    INSERT INTO student_major (student_id, major_id)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [studentId, majorId],
  );
  return result.rows;
};

export {
  getAllStudent as studentList,
  createNewStudent as addStudent,
  getSingleStudent as studentInfo,
  updateStudent as updateInfo,
  deleteStudent as removeInfo,
  enrollCourse as registerCourse,
  getAllStudentCourse as getCourse,
  getAllStudentMajor as getMajor,
  majorRegistration,
};
