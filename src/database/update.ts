import { pool } from './pool';

export const updateDb = async (): Promise<void> | never => {
  try {
    await pool.query(
      'ALTER TABLE majors ADD IF NOT EXISTS department_id INTEGER NOT NULL REFERENCES departments(department_id)',
    );
    console.log('Updated database');
  } catch (e) {
    throw e;
  }
};
