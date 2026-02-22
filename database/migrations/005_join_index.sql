CREATE INDEX idx_enrollments_course_id 
ON enrollments(course_id);

CREATE INDEX idx_student_major_major_id 
ON student_major(major_id);

CREATE INDEX idx_course_instructor_instructor_id 
ON course_instructor(instructor_id);