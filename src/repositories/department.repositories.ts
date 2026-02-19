import { pool } from "../pool";
import type {
  BaseQuery,
  Course,
  CreateDepartmentDTO,
  Department,
  Instructor,
  Major,
  UpdateDepartmentDTO,
} from "../types/index.types";
import type { EntityRepository } from "./EntityRepository.interface";
import { updateQueryBuilder } from "./helpers/updateQueryBuilder";

interface DeparmentRepository extends EntityRepository<
  Department,
  Department[],
  CreateDepartmentDTO,
  UpdateDepartmentDTO
> {
  getDepartmentCourse(id: string): Promise<Course[] | null>;
  getDepartmentInstructor(id: string): Promise<Instructor[] | null>;
  getDepartmentMajor(id: string): Promise<Major[] | null>;
}

export class PoolDeparmentRepo implements DeparmentRepository {
  async getAll(): Promise<Department[]> {
    return (
      await pool.query<Department>(
        `
          SELECT *
          FROM departments;
        `,
      )
    ).rows;
  }

  async getOne(id: string): Promise<Department | null> {
    return (
      (
        await pool.query<Department>(
          `
            SELECT * 
            FROM departments
            WHERE department_id = $1;
          `,
          [id],
        )
      ).rows[0] ?? null
    );
  }

  async create(data: CreateDepartmentDTO): Promise<Department> {
    return (
      await pool.query<Department>(
        `
          INSERT INTO departments (department_name)
          VALUES ($1)
          RETURNING *;
        `,
        [data.department_name],
      )
    ).rows[0]!;
  }

  async update(
    id: string,
    data: UpdateDepartmentDTO,
  ): Promise<Department | null> {
    const allowedField: (keyof UpdateDepartmentDTO)[] = ["department_name"];
    const { setString, values } = updateQueryBuilder(data, allowedField, id);
    return (
      (
        await pool.query<Department>(
          `
            UPDATE departments
            SET ${setString}
            WHERE department_id = $${values.length}
            RETURNING *;
          `,
        )
      ).rows[0] ?? null
    );
  }

  async delete(id: string): Promise<Department | null> {
    return (
      (
        await pool.query<Department>(
          `
            DELETE FROM departments
            WHERE department_id = $1
            RETURNING *;
          `,
          [id],
        )
      ).rows[0] ?? null
    );
  }

  async getDepartmentCourse(id: string): Promise<Course[] | null> {
    return (
      (
        await pool.query<Course>(
          `
            SELECT c.course_title, c.course_code 
            FROM courses AS c
            JOIN departments AS d
            ON c.department_id = d.department_id
            WHERE department_id = $1;
          `,
          [id],
        )
      ).rows ?? null
    );
  }

  async getDepartmentInstructor(id: string): Promise<Instructor[] | null> {
    return (
      (
        await pool.query<Instructor>(
          `
            SELECT i.first_name || ' ' || i.last_name AS full_name 
            FROM instructors AS i
            JOIN departments AS d
            ON i.department_id = d.department_id
            WHERE department_id = $1;
          `,
          [id],
        )
      ).rows ?? null
    );
  }

  async getDepartmentMajor(id: string): Promise<Major[] | null> {
    return (
      (
        await pool.query<Major>(
          `
            SELECT i.first_name || ' ' || i.last_name AS full_name 
            FROM instructors AS i
            JOIN departments AS d
            ON i.department_id = d.department_id
            WHERE department_id = $1;
          `,
          [id],
        )
      ).rows ?? null
    );
  }
}
