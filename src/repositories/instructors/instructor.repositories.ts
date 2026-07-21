import { pool } from "../../pool.js";
import type {
  BaseQuery,
  Course,
  CreateInstructorDTO,
  Department,
  Instructor,
  UpdateInstructorDTO,
} from "../../types/index.types.js";
import type { EntityRepository } from "../EntityRepository.interface.js";
import { updateQueryBuilder } from "../helpers/updateQueryBuilder.js";

interface InstructorRepository extends EntityRepository<
  Instructor,
  Instructor[],
  CreateInstructorDTO,
  UpdateInstructorDTO,
  BaseQuery
> {
  getCourse(id: string): Promise<Course[] | null>;
  getDepartment(id: string): Promise<Department | null>;
  checkInstructorExistence(
    first_name: string,
    last_name: string,
  ): Promise<Instructor | null>;
}

export class PoolInstructorRepo implements InstructorRepository {
  async getAll(query?: BaseQuery | undefined): Promise<Instructor[]> {
    const { limit = 10, offset = 0 } = query!;
    let index = 1;
    return (
      await pool.query<Instructor>(
        `
          SELECT * 
          FROM instructors
          LIMIT $${index++}
          OFFSET $${index}
        `,
        [limit, offset],
      )
    ).rows;
  }

  async getOne(id: string): Promise<Instructor | null> {
    return (
      (
        await pool.query<Instructor>(
          `
            SELECT * 
            FROM instructors
            WHERE instructor_id = $1
          `,
          [id],
        )
      ).rows[0] ?? null
    );
  }

  async create(data: CreateInstructorDTO): Promise<Instructor> {
    return (
      await pool.query<Instructor>(
        `
            INSERT INTO instructors (first_name, last_name, dob, gender, department_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, DEFAULT, DEFAULT)
            RETURNING *;
          `,
        [
          data.first_name,
          data.last_name,
          data.dob,
          data.gender,
          data.department_id,
        ],
      )
    ).rows[0]!;
  }

  async update(
    id: string,
    data: UpdateInstructorDTO,
  ): Promise<Instructor | null> {
    const allowedFields: (keyof UpdateInstructorDTO)[] = [
      "first_name",
      "last_name",
      "dob",
      "gender",
      "department_id",
    ];
    const { setString, values } = updateQueryBuilder(data, allowedFields, id);
    return (
      (
        await pool.query<Instructor>(
          `
        UPDATE instructors
        SET ${setString}
        WHERE instructor_id = $${values.length}
        RETURNING *;
      `,
        )
      ).rows[0] ?? null
    );
  }

  async delete(id: string): Promise<Instructor | null> {
    return (
      (
        await pool.query<Instructor>(
          `
            DELETE FROM instructors
            WHERE instructor_id = $1
          `,
          [id],
        )
      ).rows[0] ?? null
    );
  }

  async getCourse(id: string): Promise<Course[] | null> {
    const result = await pool.query<Course>(
      `
        SELECT c.course_title, c.course_code
        FROM courses as c
        JOIN course_instructor as ci
        ON ci.course_id = c.course_id
        WHERE ci.instructor_id = $1
      `,
      [id],
    );

    return result.rows.length ? result.rows : null;
  }

  async getDepartment(id: string): Promise<Department | null> {
    return (
      (
        await pool.query<Department>(
          `
            SELECT d.department_name 
            FROM departments as d
            JOIN instructors as i 
            ON i.department_id = d.department_id
            WHERE i.instructor_id = $1
          `,
          [id],
        )
      ).rows[0] ?? null
    );
  }
  async checkInstructorExistence(
    first_name: string,
    last_name: string,
  ): Promise<Instructor | null> {
    const instructor = await pool.query<Instructor>(
      `
          SELECT * 
          FROM instructors
          WHERE first_name = $1 
          AND last_name = $2;
        `,
      [first_name, last_name],
    );
    return instructor.rows[0] ?? null;
  }
}
