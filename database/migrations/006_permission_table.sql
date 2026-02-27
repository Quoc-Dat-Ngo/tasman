CREATE TYPE role_enum AS ENUM ('admin','student','instructor');

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name role_enum UNIQUE NOT NULL
);

CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,

    /* Will be in the form of [action:resource] when extracting from database, 
    * e.g: create:course 
    */
    action TEXT NOT NULL, 
    resource TEXT NOT NULL,
    UNIQUE (action, resource)
);

/* Junction table for roles and permissions */
CREATE TABLE role_permissions (
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(permission_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);  