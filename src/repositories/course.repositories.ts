import { pool } from "../pool";
import type {
  BaseQuery,
  Course,
  CreateCourseDTO,
  Department,
  Instructor,
  Student,
  UpdateCourseDTO,
} from "../types/index.types";
import type { EntityRepository } from "./EntityRepository.interface";
import { updateQueryBuilder } from "./helpers/updateQueryBuilder";

interface CourseRepository extends EntityRepository<
  Course,
  Course[],
  CreateCourseDTO,
  UpdateCourseDTO,
  BaseQuery
> {
  getStudent(id: string): Promise<Student[] | null>;
  getInstructor(id: string): Promise<Instructor[] | null>;
  getDepartment(id: string): Promise<Department | null>;
}

export class PoolCourseRepo implements CourseRepository {
  async getAll(query: BaseQuery): Promise<Course[]> {
    const { limit = 10, offset = 0, sort } = query;
    let index = 1;

    const result = await pool.query<Course>(
      `
        SELECT * 
        FROM courses
        LIMIT $${index++}
        OFFSET $${index};
      `,
      [limit, offset],
    );
    return result.rows;
  }

  async getOne(id: string): Promise<Course | null> {
    const result = await pool.query<Course>(
      `
        SELECT * 
        FROM courses
        WHERE course_id = $1;
      `,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(data: CreateCourseDTO): Promise<Course> {
    const result = await pool.query<Course>(
      `
        INSERT INTO courses (course_title, course_code, fee, department_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT)
        RETURNING *;
      `,
      [data.course_title, data.course_code, data.fee, data.department_id],
    );

    return result.rows[0]!;
  }

  async update(id: string, data: UpdateCourseDTO): Promise<Course | null> {
    const allowedFields: (keyof UpdateCourseDTO)[] = [
      "course_title",
      "course_code",
      "fee",
      "department_id",
    ];
    const { setString, values } = updateQueryBuilder(data, allowedFields, id);
    const result = await pool.query<Course>(
      `
        UPDATE courses 
        SET ${setString} 
        WHERE course_id = $${values.length}
        RETURNING *;
      `,
      values,
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<Course | null> {
    const result = await pool.query<Course>(
      `
        DELETE FROM courses
        WHERE course_id = $1
        RETURNING *;
      `,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async getStudent(id: string): Promise<Student[] | null> {
    const result = await pool.query<Student>(
      `
        SELECT s.first_name || ' ' ||s.last_name AS full_name
        FROM students as s
        JOIN enrollments as e
        ON e.student_id = s.student_id
        WHERE e.course_id = $1
      `,
      [id],
    );
    return result.rows.length ? result.rows : null;
  }

  async getInstructor(id: string): Promise<Instructor[] | null> {
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
    return result.rows.length ? result.rows : null;
  }

  async getDepartment(id: string): Promise<Department | null> {
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
    return result.rows[0] ?? null;
  }
}
