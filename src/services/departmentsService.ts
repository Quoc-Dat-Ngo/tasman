import { pool } from "../database/pool";
import type {
  Department,
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from "../types";

const getAllDepartment = async () => {};
const createNewDepartment = async (
  body: CreateDepartmentDTO,
): Promise<Department> => {
  const result = await pool.query(
    `
    INSERT INTO departments (department_name)
    VALUES ($1)
    RETURNING *;
      `,
    [body.department_name],
  );
  return result.rows[0];
};
const getSingleDepartment = async () => {};
const updateDepartment = async () => {};
const deleteDepartment = async () => {};
const getAllDepartmentCourse = async () => {};
const getAllDepartmentInstructor = async () => {};
const getAllDepartmentMajor = async () => {};

export {
  getAllDepartment as allDepartment,
  createNewDepartment as newDeparment,
  getSingleDepartment as singleDepartment,
  updateDepartment as modifyDepartment,
  deleteDepartment as removeDepartment,
  getAllDepartmentCourse as getCourse,
  getAllDepartmentInstructor as getInstructor,
  getAllDepartmentMajor as getMajor,
};
