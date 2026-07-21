import { pool } from "../pool.js";
import type {
  BaseQuery,
  CreateMajorDTO,
  Department,
  Major,
  Student,
  UpdateMajorDTO,
} from "../types/index.types.js";
import type { EntityRepository } from "./EntityRepository.interface.js";
import { updateQueryBuilder } from "./helpers/updateQueryBuilder.js";

interface MajorRepository extends EntityRepository<
  Major,
  Major[],
  CreateMajorDTO,
  UpdateMajorDTO,
  BaseQuery
> {
  getStudent(id: string): Promise<Student[] | null>;
  getDepartment(id: string): Promise<Department | null>;
}

export class PoolMajorRepo implements MajorRepository {
  async getAll(query: BaseQuery): Promise<Major[]> {
    const { limit = 10, offset = 0 } = query;
    let index = 1;
    const result = await pool.query<Major>(
      `
        SELECT * 
        FROM majors
        LIMIT $${index++}
        OFFSET $${index};
      `,
      [limit, offset],
    );
    return result.rows;
  }

  async getOne(id: string): Promise<Major | null> {
    const result = await pool.query<Major>(
      `
        SELECT * 
        FROM majors
        WHERE major_id = $1;
      `,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(data: CreateMajorDTO): Promise<Major> {
    const result = await pool.query<Major>(
      `
        INSERT INTO majors (major_name, department_id, created_at, updated_at)
        VALUES ($1, $2, DEFAULT, DEFAULT)
        RETURNING *;
      `,
      [data.major_name, data.department_id],
    );
    return result.rows[0]!;
  }

  async update(id: string, data: UpdateMajorDTO): Promise<Major | null> {
    const allowedFields: (keyof UpdateMajorDTO)[] = [
      "major_name",
      "department_id",
    ];
    const { setString, values } = updateQueryBuilder(data, allowedFields, id);
    const result = await pool.query<Major>(
      `
        UPDATE majors
        SET ${setString}
        WHERE major_id = $${values.length}
        RETURNING *;
      `,
      values,
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<Major | null> {
    const result = await pool.query<Major>(
      `
        DELETE FROM majors
        WHERE major_id = $1
        RETURNING *;
      `,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async getStudent(id: string): Promise<Student[] | null> {
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
    return result.rows.length ? result.rows : null;
  }

  async getDepartment(id: string): Promise<Department | null> {
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
    return result.rows[0] ?? null;
  }
}
