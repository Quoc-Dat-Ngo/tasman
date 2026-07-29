import { pool } from "../helpers/db.js";

export async function clearDatabase() {
  await pool.query(
    `
		TRUNCATE TABLE
		students,
		departments,
		majors,
		courses,
		instructors,
		enrollments,
		student_major,
		course_instructor,
		roles,
		permissions,
		role_permissions,
		users,
		refresh_tokens
		RESTART IDENTITY CASCADE;
    `,
  );
}
