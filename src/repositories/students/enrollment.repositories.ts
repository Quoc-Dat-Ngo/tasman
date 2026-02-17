import { pool } from "../../database/pool";
import type { Enrollment } from "../../types";

interface EnrollmentRepository {
  enroll(studentId: string, courseId: string): Promise<Enrollment | null>;
  // TODO: delete
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
}
