import { pool } from "../../database/pool";
import type { Enrollment } from "../../types";

interface EnrollmentRepository {
  enroll(studentId: string, courseId: string): Promise<Enrollment[] | null>;
  // TODO: delete
}

class PoolEnrollmentRepo implements EnrollmentRepository {
  async enroll(studentId: string, courseId: string): Promise<Enrollment[]> {
    const result = await pool.query<Enrollment>(
      `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *;`,
      [studentId, courseId],
    );
    return result.rows ?? null;
  }
}
