import type {
  Major,
  CreateMajorDTO,
  UpdateMajorDTO,
  IDType,
  Department,
  StudentMajor,
  Student,
  PaginationQuery,
} from "../types";
import { pool } from "../database/pool";
import { updateMajorTable } from "../utils/updateTable";

const getAllMajor = async (query: PaginationQuery) => {
  const result = await pool.query<Major>(
    `
    SELECT * 
    FROM majors
    LIMIT ${query.limit !== undefined ? query.limit : 20}
    OFFSET ${query.offset !== undefined ? query.offset : 0};
    ;
    `,
  );
  return result.rows;
};
const createNewMajor = async (body: CreateMajorDTO): Promise<Major[]> => {
  const result = await pool.query<Major>(
    `
    INSERT INTO majors (major_name, department_id)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [body.major_name, body.department_id],
  );
  return result.rows;
};
const getSingleMajor = async (id: IDType) => {
  const result = await pool.query<Major>(
    `
    SELECT * 
    FROM majors
    WHERE major_id = $1;
    `,
    [id],
  );
  return result.rows;
};
const updateMajor = async (id: IDType, body: UpdateMajorDTO) => {
  const { fields, values, index } = updateMajorTable(id, body);
  const result = await pool.query<Major>(
    `
    UPDATE majors
    SET ${fields.join(", ")}
    WHERE major_id = $${index}
    RETURNING *;
    `,
    values,
  );
  return result.rows;
};
const deleteMajor = async (id: IDType) => {
  const result = await pool.query<Major>(
    `
    DELETE FROM majors
    WHERE major_id = $1
    RETURNING *;
    `,
    [id],
  );
  return result.rows;
};
const getAllMajorStudent = async (id: IDType) => {
  const result = await pool.query<Student>(
    `
    SELECT s.first_name || ' ' || s.last_name as full_name
    FROM students as s
    JOIN student_major as sm
    ON sm.student_id = s.student_id
    WHERE sm.major_id = $1
    `,
    [id],
  );
  return result.rows;
};
const getMajorDepartment = async (id: IDType) => {
  const result = await pool.query<Department>(
    `
    SELECT d.department_name
    FROM departments as d
    JOIN majors as m
    ON m.department_id = d.department_id
    WHERE m.major_id = $1
    `,
    [id],
  );
  return result.rows;
};

export {
  getAllMajor as allMajor,
  createNewMajor as newMajor,
  getSingleMajor as singleMajor,
  updateMajor as modifyMajor,
  deleteMajor as removeMajor,
  getAllMajorStudent as getStudent,
  getMajorDepartment as getDeparment,
};
