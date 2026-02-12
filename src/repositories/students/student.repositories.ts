import { pool } from "../../database/pool";
import type {
  Course,
  CreateStudentDTO,
  StudentMetadata,
  Major,
  Student,
  StudentQueryDTO,
  UpdateStudentDTO,
} from "../../types";
import type { EntityRepository } from "../EntityRepository.interface";
import { updateQueryBuilder } from "../helpers/updateQueryBuilder";

interface StudentRepository extends EntityRepository<
  Student,
  StudentMetadata,
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO
> {
  getCourse(id: string): Promise<Course[] | null>;
  getMajor(id: string): Promise<Major[] | null>;
}

export class PoolStudentRepo implements StudentRepository {
  async getAll(query: StudentQueryDTO): Promise<StudentMetadata> {
    const { limit = 10, offset = 0, sort, ...filters } = query;
    const whereClauses: string[] = [];
    const values: (string | undefined)[] = [];

    const orderByClauses: string[] = [];
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

    const whereString =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    sort?.split(",").forEach((field) => {
      if (!field.startsWith("-")) {
        orderByClauses.push(`${field} ASC`);
      } else {
        orderByClauses.push(`${field.slice(1)} DESC`);
      }
    });

    const orderByString = orderByClauses.length
      ? `ORDER BY ${orderByClauses.join(", ")}`
      : "";

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
        ${orderByString}
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
  }

  async getOne(id: string): Promise<Student | null> {
    const result = await pool.query<Student>(
      `
      SELECT * 
      FROM students 
      WHERE student_id = $1;`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async create(data: CreateStudentDTO): Promise<Student> {
    const result = await pool.query<Student>(
      `
      INSERT INTO students (first_name, last_name, dob, gender) 
      VALUES ($1, $2, $3, $4);`,
      [data.first_name, data.last_name, data.dob, data.gender],
    );
    return result.rows[0]!;
  }

  async update(id: string, data: UpdateStudentDTO): Promise<Student | null> {
    // Using helper function to enhance redability, scalability and maintainability
    const allowedFields: (keyof UpdateStudentDTO)[] = [
      "first_name",
      "last_name",
      "dob",
      "gender",
    ];
    const { setString, values } = updateQueryBuilder(data, allowedFields, id);
    const result = await pool.query<Student>(
      `
      UPDATE students
      SET ${setString}
      WHERE student_id = $${values.length}
      RETURNING *;`,
      values,
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<Student | null> {
    const result = await pool.query<Student>(
      `
      DELETE FROM students
      WHERE student_id = $1
      RETURNING *;`,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async getCourse(id: string): Promise<Course[]> {
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

    return result.rows ?? null;
  }

  async getMajor(id: string): Promise<Major[]> {
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

    return result.rows ?? null;
  }
}
