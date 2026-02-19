ALTER TABLE students 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE courses 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE majors 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE instructors 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE departments 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE enrollments 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE student_major 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE course_instructor 
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN 
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_students
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_coures
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_majors
BEFORE UPDATE ON majors
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_instructors
BEFORE UPDATE ON instructors
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_departments
BEFORE UPDATE ON departments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_enrollments
BEFORE UPDATE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_student_major
BEFORE UPDATE ON student_major
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_timestamp_course_instructor
BEFORE UPDATE ON course_instructor
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();



