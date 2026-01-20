import { pool } from './pool.js';

export const resetDb = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS enrollments;');
    await pool.query('DROP TABLE IF EXISTS student_major;');
    await pool.query('DROP TABLE IF EXISTS course_major;');
    await pool.query('DROP TABLE IF EXISTS course_instructor;');
  } catch (e) {
    throw e;
  }
};
