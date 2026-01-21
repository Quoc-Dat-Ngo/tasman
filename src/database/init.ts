import { pool } from './pool';

// Set up database schema
// Link to ER Diagram - https://lucid.app/lucidchart/58de6dd1-7030-4c6c-abe0-e53aaa9c1b43/edit?viewport_loc=-1235%2C-456%2C2175%2C1041%2C0_0&invitationId=inv_39190bf5-33fd-4512-80eb-05ed6e48241a
export const initDb = async (): Promise<void> | never => {
  try {
    // Create table for students
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        student_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(1) NOT NULL CHECK (gender IN ('M','F'))
      );  
    `);
    // Create table for departments
    await pool.query(`
      CREATE TABLE IF NOT EXISTS departments (
        department_id SERIAL PRIMARY KEY,
        department_name VARCHAR(255) NOT NULL
      );  
    `);
    // Create table for courses
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        course_id SERIAL PRIMARY KEY,
        course_title VARCHAR(255) NOT NULL,
        course_code VARCHAR(8) UNIQUE NOT NULL,
        fee NUMERIC(6,2) NOT NULL,
        department_id INTEGER REFERENCES departments(department_id) NOT NULL
      );  
    `);
    // Create table for instructors
    await pool.query(`
      CREATE TABLE IF NOT EXISTS instructors (
        instructor_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(1) NOT NULL CHECK (gender IN ('M','F')),
        department_id INTEGER REFERENCES departments(department_id) NOT NULL
      );  
    `);
    // Create table for majors
    await pool.query(`
      CREATE TABLE IF NOT EXISTS majors (
        major_id SERIAL PRIMARY KEY,
        major_name VARCHAR(255) NOT NULL
      );  
    `);
    // Create junction table for students-courses
    await pool.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        enrollment_id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
        course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
        UNIQUE(student_id, course_id)
      );  
    `);
    // Create junction table for courses-majors
    await pool.query(`
      CREATE TABLE IF NOT EXISTS course_major (
        course_major_id SERIAL PRIMARY KEY,
        course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
        major_id INTEGER NOT NULL REFERENCES majors(major_id) ON DELETE CASCADE,
        UNIQUE(course_id, major_id)
      );  
    `);
    // Create junction table for students-majors
    await pool.query(`
      CREATE TABLE IF NOT EXISTS student_major (
        student_major_id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
        major_id INTEGER NOT NULL REFERENCES majors(major_id) ON DELETE CASCADE,
        UNIQUE(student_id, major_id)
      );  
    `);
    // Create junction table for courses-instructors
    await pool.query(`
      CREATE TABLE IF NOT EXISTS course_instructor (
        course_instructor_id SERIAL PRIMARY KEY,
        course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
        instructor_id INTEGER NOT NULL REFERENCES instructors(instructor_id) ON DELETE CASCADE,
        UNIQUE(course_id, instructor_id)
      );  
    `);
    console.log('Initialise new tables and establish relationships');
  } catch (e) {
    throw e;
  }
};
