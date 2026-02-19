/* Use Postgres ENUM TYPE instead of domain constraint on gender*/
CREATE TYPE gender_enum AS ENUM ('M', 'F');  

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender gender_enum NOT NULL
);  

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    UNIQUE (department_name)
); 

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_title VARCHAR(255) NOT NULL,
    course_code VARCHAR(8) NOT NULL,
    fee NUMERIC(6,2) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id) NOT NULL,
    UNIQUE (course_title, course_code)
);  

CREATE TABLE instructors (
    instructor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    department_id INTEGER REFERENCES departments(department_id) NOT NULL
);  

CREATE TABLE majors (
    major_id SERIAL PRIMARY KEY,
    major_name VARCHAR(255) NOT NULL,
    UNIQUE (major_name)
);  

CREATE TABLE enrollments (
    student_id INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);  

CREATE TABLE student_major (
    student_id INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
    major_id INTEGER REFERENCES majors(major_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, major_id)
);  

CREATE TABLE course_instructor (
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
    instructor_id INTEGER REFERENCES instructors(instructor_id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, instructor_id)
);  
