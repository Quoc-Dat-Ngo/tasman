import { pool } from "../../database/pool";
import type { StudentMajor } from "../../types";

interface StudentMajorRepository {
  register(studentId: string, majorId: string): Promise<StudentMajor | null>;
  // TODO: delete
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
}
