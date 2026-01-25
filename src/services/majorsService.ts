import type { Major, CreateMajorDTO, UpdateMajorDTO } from "../types";
import { pool } from "../database/pool";

const getAllMajor = async () => {};
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
const getSingleMajor = async () => {};
const updateMajor = async () => {};
const deleteMajor = async () => {};
const getAllMajorCourse = async () => {};
const getAllMajorStudent = async () => {};
const getMajorDepartment = async () => {};

export {
  getAllMajor as allMajor,
  createNewMajor as newMajor,
  getSingleMajor as singleMajor,
  updateMajor as modifyMajor,
  deleteMajor as removeMajor,
  getAllMajorCourse as getCourse,
  getAllMajorStudent as getStudent,
  getMajorDepartment as getDeparment,
};
