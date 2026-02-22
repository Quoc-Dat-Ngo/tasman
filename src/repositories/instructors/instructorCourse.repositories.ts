import { pool } from "../../pool";
import type { InstructorCourse } from "../../types/index.types";

interface InstructorCourseRepository {
  register(
    courseId: string,
    instructorID: string,
  ): Promise<InstructorCourse | null>;
  delete(id: string): Promise<InstructorCourse | null>;
}
export class PoolInstructorCourseRepo implements InstructorCourseRepository {
  async register(
    courseId: string,
    instructorID: string,
  ): Promise<InstructorCourse | null> {
    const result = await pool.query<InstructorCourse>(
      `
        INSERT INTO course_instructor (course_id, instructor_id, created_at, updated_at)
        VALUES ($1, $2, DEFAULT, DEFAULT)
        RETURNING *;
      `,
      [courseId, instructorID],
    );
    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<InstructorCourse | null> {
    const result = await pool.query<InstructorCourse>(
      `
        DELETE FROM course_instructor
        WHERE course_instructor_id = $1
        RETURNING *;
      `,
      [id],
    );
    return result.rows[0] ?? null;
  }
}
