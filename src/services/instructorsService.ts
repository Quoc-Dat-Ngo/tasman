import { pool } from "../database/pool";
import type { CreateInstructorDTO, Instructor } from "../types";

const getAllInstructor = async () => {};
const createNewInstructor = async (
  body: CreateInstructorDTO,
): Promise<Instructor[]> => {
  const result = await pool.query<Instructor>(
    `
        INSERT INTO instructors (first_name, last_name, dob, gender, department_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
    [
      body.first_name,
      body.last_name,
      body.dob,
      body.gender,
      body.department_id,
    ],
  );
  return result.rows;
};
const getSingleInstructor = async () => {};
const updateInstructor = async () => {};
const deleteInstructor = async () => {};
const getAllInstructorCourse = async () => {};
const getInstructorDepartment = async () => {};

export {
  getAllInstructor as allInstructor,
  createNewInstructor as newInstructor,
  getSingleInstructor as singleInstructor,
  updateInstructor as modifyInstructor,
  deleteInstructor as removeInstructor,
  getAllInstructorCourse as getCourse,
  getInstructorDepartment as getDepartment,
};
