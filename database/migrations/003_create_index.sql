CREATE INDEX idx_courses_department_id
ON courses(department_id);

CREATE INDEX idx_instructors_department_id
ON instructors(department_id);

ALTER TABLE majors 
ADD COLUMN department_id INTEGER NOT NULL REFERENCES departments(department_id);

CREATE INDEX idx_majors_department_id
ON majors(department_id);