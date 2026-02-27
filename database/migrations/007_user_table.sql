CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL, /* Hashed User Password*/
    role_id INTEGER NOT NULL REFERENCES roles(role_id),
    linked_student_id INTEGER REFERENCES students(student_id) ON DELETE SET NULL,
    linked_instructor_id INTEGER REFERENCES instructors(instructor_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

    /* db-level check to make sure a user cannot be both a student and an instructor
    * but in our case a student can be an instructor
    CHECK (
        (linked_student_id IS NOT NULL)::int +
        (linked_instructor_id IS NOT NULL)::int <= 1
    )
    */

    /* db-level check for:
    *       admin: has neither student_id and instructor_id
    *       student/instructor: must have at least 1 (can have both)
    CHECK (
        (user_role = 'admin' AND linked_student_id IS NULL AND linked_instructor_id IS NULL) 
        OR
        (user_role IN ('student', 'instructor')
        AND (linked_student_id IS NOT NULL OR linked_instructor_id IS NOT NULL))
    )
    */
);
