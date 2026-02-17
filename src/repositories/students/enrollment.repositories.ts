import { pool } from "../../database/pool";
import type { Enrollment } from "../../types";

interface EnrollmentRepository {
  enroll(studentId: string, courseId: string): Promise<Enrollment | null>;
  delete(id: string): Promise<Enrollment | null>;
}

export class PoolEnrollmentRepo implements EnrollmentRepository {
  async enroll(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment | null> {
    const result = await pool.query<Enrollment>(
      `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *;`,
      [studentId, courseId],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<Enrollment | null> {
    const result = await pool.query<Enrollment>(
      `
        DELETE FROM enrollments
        WHERE enrollment_id = $1
        RETURNING *;
      `,
      [id],
    );
    return result.rows[0] ?? null;
  }
}
