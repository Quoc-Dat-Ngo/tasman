import { pool } from "../../pool.js";
import type { StudentMajor } from "../../types/index.types.js";

interface StudentMajorRepository {
  register(studentId: string, majorId: string): Promise<StudentMajor | null>;
  delete(id: string): Promise<StudentMajor | null>;
}

export class PoolStudentMajorRepo implements StudentMajorRepository {
  async register(
    studentId: string,
    majorId: string,
  ): Promise<StudentMajor | null> {
    const result = await pool.query<StudentMajor>(
      `
        INSERT INTO student_major (student_id, major_id, created_at, updated_at)
        VALUES ($1, $2, DEFAULT, DEFAULT)
        RETURNING *;
      `,
      [studentId, majorId],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<StudentMajor | null> {
    return (
      (
        await pool.query<StudentMajor>(
          `
        DELETE FROM student_major
        WHERE student_major = $1
        RETURNING *;
      `,
          [id],
        )
      ).rows[0] ?? null
    );
  }
}
