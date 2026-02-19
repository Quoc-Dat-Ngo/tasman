import { pool } from "../../pool";
import type { StudentMajor } from "../../types/index.types";

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
        INSERT INTO student_major (student_id, major_id)
        VALUES ($1, $2)
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
