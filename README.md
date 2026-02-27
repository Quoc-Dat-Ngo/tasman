# Tasman – Production-Grade Student Course Management System

Tasman is a production-focused REST API inspired by real-world university systems. Built using Node.js (TypeScript), Express, and PostgreSQL, it showcases scalable backend architecture, secure authentication workflows, and advanced relational database design.

### Highlights:
-	JWT Authentication with refresh token rotation
-	Role-Based Access Control (RBAC)
-	Advanced relational schema with junction tables
-	Pagination, filtering & sorting across large datasets
-	Performance-aware indexing strategy
-	Docker-ready and cloud deployable

Tasman is designed as a SaaS-ready backend foundation for academic management platforms.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Database Integration](#database-integration)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Authentication & Authorisation](#authentication--authorization)
- [Error Handling](#error-handling-strategy)
- [Pagination, Filtering & Sorting](#pagination-filtering--sorting)
- [Database Indexing](#database-indexing-strategy)
- [Testing](#testing-strategy)
- [Improvements](#future-improvements)


## Architecture Overview

The application follows a layered architecture pattern that separates concerns
and promotes maintainability:

### Layered Architecture

```
┌─────────────────┐
│   Routes        │ ← API endpoints, route handlers
├─────────────────┤
│   Controllers   │ ← Request/response logic, error handling
├─────────────────┤
│   Services      │ ← Business logic, password hashing, validation, etc...
├─────────────────┤
│   Repositories  │ ← Database operations
├─────────────────┤
│   Database      │ ← Connection pool, queries
├─────────────────┤
│   Middleware    │ ← Logging, error handling
└─────────────────┘
```

### Key Design Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Injection**: Services are injected into controllers
- **Error Handling**: Centralized error handling with custom error classes
- **Validation**: Input validation at multiple layers
- **Testing**: Comprehensive unit and integration tests

## Project Structure

```
tasman/
├── database/
│   ├── migrate.ts              # Migration runner
│   └── migrations/             # Versioned SQL migrations
│       ├── 001_init_schema.sql
│       ├── 002_add_timestamp.sql
│       └── ...                 # Additional schema migrations
├── mock_records/               # CSV files for seed data
│   └── Students.csv, Courses.csv, etc.
├── src/
│   ├── app.ts                 # Express application setup
│   ├── server.ts              # Server entry point
│   ├── pool.ts                # PostgreSQL connection pool
│   ├── config/
│   │   └── env.ts             # Environment variables configuration
│   ├── controllers/            # Request/response handlers
│   │   ├── student.controllers.ts
│   │   ├── course.controllers.ts
│   │   └── ...
│   ├── errors/                 # Custom error classes
│   │   ├── AppError.ts
│   │   └── assertFound.ts
│   ├── http/
│   │   └── parseParamID.ts    # HTTP utility functions
│   ├── middlewares/            # Express middlewares
│   │   ├── authenticate.ts     # Bearer token validation
│   │   ├── authorise.ts        # RBAC authorization
│   │   └── errorHandler.ts     # Global error handling
│   ├── modules/                # Feature modules
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controllers.ts
│   │   │   ├── auth.repositories.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.services.ts
│   │   ├── admin/              # Admin management module
│   │   │   └── ...
│   │   └── authz/              # Authorization/RBAC module
│   │       ├── permissions/
│   │       ├── rbac_authz/
│   │       ├── role_permissions/
│   │       └── roles/
│   ├── repositories/           # Data access layer
│   │   ├── student.repositories.ts
│   │   ├── course.repositories.ts
│   │   ├── EntityRepository.interface.ts
│   │   └── ...
│   ├── routes/                 # API route definitions
│   │   ├── students.routes.ts
│   │   ├── courses.routes.ts
│   │   └── ...
│   ├── services/               # Business logic layer
│   │   ├── student.services.ts
│   │   ├── course.services.ts
│   │   └── ...
│   ├── types/                  # TypeScript type definitions
│   │   ├── student.types.ts
│   │   ├── course.types.ts
│   │   ├── user.types.ts
│   │   └── ...
│   └── utils/                  # Utility functions
│       └── auth.utils.ts       # Authentication utilities
├── eslint.config.ts            # ESLint configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Technology Stack

- **Runtime**: Node.js (Typescript)
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon serverless)
- **Database Client**: pg (node-postgres)
- **Validation**: Zod
- **Logging**: Morgan
- **Testing**: Jest + Supertest
- **Environment**: dotenv
- **Development**: npx

## Database Integration

### ER Diagram
[Entity-Realtionship Diagram](https://lucid.app/lucidchart/58de6dd1-7030-4c6c-abe0-e53aaa9c1b43/edit?viewport_loc=-1491%2C-606%2C2932%2C1465%2C0_0&invitationId=inv_39190bf5-33fd-4512-80eb-05ed6e48241a)

### Neon PostgreSQL Setup

The application uses Neon (neon.tech) for serverless PostgreSQL hosting.
Connection is established through:

- **Connection Pooling**: Uses `pg.Pool` for efficient connection management
- **SSL Required**: Neon requires SSL connections
- **Environment Variables**: Database URL stored in `.env`

### Database Configuration

```typescript
// src/pool.ts
import { Pool } from 'pg';

const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL + '&sslmode=verify-full',
});
```

### Schema Management

Database schema is managed via versioned SQL migrations and initialization scripts:

- **Migration Runner**: Utilises Postgres' feature Transaction to uphold ACID workflow.
```ts
async function executeMigrationFiles() {
  const migrationFiles = fs
    .readdirSync(pathToMigration)
    .filter((file) => file.endsWith(".sql"))
    .sort(); // ensure deterministic order (001, 002, 003...)

  for (const file of migrationFiles) {
    console.log("Processing migration:", file);

    const check = await pool.query(
      `
        SELECT 1
        FROM schema_migrations
        WHERE filename = $1;
      `,
      [file],
    );

    if (check.rowCount && check.rowCount > 0) {
      console.log("Already executed, skipping:", file);
      continue;
    }

    const filePath = join(pathToMigration, file);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

    try {
      await pool.query("BEGIN");
      await pool.query(fileContent);
      await pool.query(
        `
          INSERT INTO schema_migrations (filename)
          VALUES ($1);
        `,
        [file],
      );
      await pool.query("COMMIT");

      console.log("Successfully executed:", file);
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Failed migration:", file);
      throw error;
    }
  }
}

async function runMigrations() {
  await ensureMigrationTable();
  await executeMigrationFiles();
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Migration runner failed:", err);
  process.exit(1);
});
```
- **Version Tracker**: Introduce ```schema_migrations``` table to keep track of the old (executed) and current (about to execute) migration files.
```ts
async function ensureMigrationTable() {
  await pool.query(
    `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW()
      );
    `,
  );
}
```
- **Run Script**: Using tsx to run ```migrate.ts``` via npm run scripts located in ```package.json```.
```json
"migrate": "tsx database/migrate.ts"
```

### Student Schema

```sql
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Course Schema

```sql
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_title VARCHAR(255) NOT NULL,
    course_code VARCHAR(8) NOT NULL,
    fee NUMERIC(6,2) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (course_title, course_code)
);
```

### Instructor Schema

```sql
CREATE TABLE instructors (
    instructor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    department_id INTEGER REFERENCES departments(department_id) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Major Schema

```sql
CREATE TABLE majors (
    major_id SERIAL PRIMARY KEY,
    major_name VARCHAR(255) NOT NULL
    department_id INTEGER REFERENCES departments(department_id) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Department Schema

```sql
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### User Schema
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL, /* Hashed User Password*/
    role_id INTEGER NOT NULL REFERENCES roles(role_id),
    linked_student_id INTEGER REFERENCES students(student_id) ON DELETE SET NULL,
    linked_instructor_id INTEGER REFERENCES instructors(instructor_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Role Schema
```sql
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name role_enum UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

);
```
### Permission Schema
```sql
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    action TEXT NOT NULL, 
    resource TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    UNIQUE (action, resource)
);
```

### Student-Course (Enrollment) Schema

```sql
CREATE TABLE enrollments (
    student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);
```

### Student-Major Schema

```sql
CREATE TABLE student_major (
    student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    major_id INTEGER NOT NULL REFERENCES majors(major_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, major_id)
);
```

### Course-Instructor Schema

```sql
CREATE TABLE course_instructor (
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    instructor_id INTEGER NOT NULL REFERENCES instructors(instructor_id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, instructor_id)
);
```

### Role-Permission Schema
```sql
CREATE TABLE role_permissions (
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(permission_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (role_id, permission_id)
);  
```

## API Endpoints

The API provides complete CRUD operations for task management:

### Base URL
```
http://localhost:3004/api/v1/
```

### Entity Management

**Students:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Retrieve all students |
| POST | `/students` | Create a new student |
| GET | `/students/:id` | Retrieve a specific student |
| PATCH | `/students/:id` | Update a specific student |
| DELETE | `/students/:id` | Delete a specific student |
| GET | `/students/:id/courses` | Get all courses that a student enrolled in |
| POST | `/students/:id/enrollments` | Enroll a student into a specific course |
| GET | `/students/:id/majors` | Get all majors that a student currently takes |
| POST | `/students/:id/majors` | Register for a student to a specific major |

**Courses:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Retrieve all courses |
| POST | `/courses` | Create a new course |
| GET | `/courses/:id` | Retrieve a specific course |
| PATCH | `/courses/:id` | Update a specific course |
| DELETE | `/courses/:id` | Delete a specific course |
| GET | `/courses/:id/students` | Get all students currently enroll in the course |
| GET | `/courses/:id/instructors` | Get all instructors currently work in the course |
| GET | `/courses/:id/department` | Get the deparment of the course |

**Instructors:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/instructors` | Retrieve all instructors |
| POST | `/instructors` | Create a new instructor |
| GET | `/instructors/:id` | Retrieve a specific instructor |
| PATCH | `/instructors/:id` | Update a specific instructor |
| DELETE | `/instructors/:id` | Delete a specific instructor |
| GET | `/instructors/:id/courses` | Get all courses that a specific instructor currently works in |
| GET | `/instructors/:id/department` | Get the department that a specific instructor is part of |

**Majors:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/majors` | Retrieve all majors |
| POST | `/majors` | Create a new major |
| GET | `/majors/:id` | Retrieve a specific major |
| PATCH | `/majors/:id` | Update a specific major |
| DELETE | `/majors/:id` | Delete a specific major |
| GET | `/majors/:id/students` | Get all students enrolled in a specific major |
| GET | `/majors/:id/department` | Get the department of a particular major |

**Departments:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/departments` | Retrieve all departments |
| POST | `/departments` | Create a new department |
| GET | `/departments/:id` | Retrieve a specific department |
| PATCH | `/departments/:id` | Update a specific department |
| DELETE | `/departments/:id` | Delete a specific department |
| GET | `/departments/:id/instructors` | Get all instructors part of the department |
| GET | `/departments/:id/courses` | Get all courses part of the department |
| GET | `/departments/:id/majors` | Get all majors part of the department |

**User (Admin Only):**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin` | Get all active and inactive users |
| POST | `/admin` | Create a new user |
| GET | `/admin/:id` | Retrieve a specific user |
| PATCH | `/admin/:id` | Update a specific user |
| DELETE | `/admin/:id` | Delete a specific user |

**Role:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/roles` | Get all registered roles |
| POST | `/roles` | Create a new role |
| GET | `/roles/:id` | Retrieve a specific role |
| PATCH | `/roles/:id` | Update a specific role |
| DELETE | `/roles/:id` | Delete a specific role |

**Permission:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/permissions` | Get all registered permissions |
| POST | `/permissions` | Create a new permission |
| GET | `/permissions/:id` | Retrieve a specific permission |
| PATCH | `/permissions/:id` | Update a specific permission |
| DELETE | `/permissions/:id` | Delete a specific permission |

### Relationship Management (Join Tables):

**Enrollments:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/enrollments` | Enroll a student into a course |
| DELETE | `/enrollments` | Remove a student from a course |

**Student-Majors:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/student-majors` | Assign a major to a student |
| DELETE | `/student-majors` | Remove a major from a student |

**Instructor-Courses:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/instructor-courses` | Assign an instructor to a course |
| DELETE | `/instructor-courses` | Remove an instructor from a course |

**Role-Permissions:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/role-permissions` | Allow a specific permission for target role |
| DELETE | `/role-permissions/:id` | Delete existing permission for target role |



## Features
## Authentication & Authorization

### Advanced RBAC Schema
The application implements a production-grade Role-Based Access Control (RBAC) system using a scalable, normalized database design:

**Core Components:**
- **Roles Table**: Stores role definitions (admin, student, instructor) using PostgreSQL ENUMs for type safety
- **Permissions Table**: Fine-grained permission definitions with action-resource pairs (e.g., "create:course", "read:student")
- **Role-Permissions Junction Table**: Maps roles to permissions, allowing flexible permission assignment

**Database Schema:**
```sql
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name role_enum UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (action, resource)
);

CREATE TABLE role_permissions (
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(permission_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id)
);
```

**Benefits:**
- Supports hierarchical permission models
- Easy to add new permissions without schema changes
- Enforces data integrity through foreign keys and constraints
- Enables dynamic permission assignment at runtime

**Implementation:**
- Authorization middleware: [src/middlewares/authorise.ts](src/middlewares/authorise.ts)
- RBAC module: [src/modules/authz/](src/modules/authz/)

### Permission Normalization Strategy
Permissions are normalized using an action-resource model, separating authorization concerns from business logic:

**Format:** `{action}:{resource}`

**Examples:**
- `create:student` - Permission to create students
- `read:course` - Permission to view courses
- `delete:enrollment` - Permission to remove enrollments
- `update:major` - Permission to modify majors

**Design Advantages:**
- Single table for all permissions (horizontally scalable)
- Clear permission hierarchy through naming conventions
- Eliminates permission duplication across roles
- Supports fine-grained access control (FGAC) patterns
- Simplifies audit logging and permission reporting

**Implementation Architecture:**
- Centralized permission definitions in `src/modules/authz/permissions/`
- Role-permission associations in `role_permissions` table
- Runtime permission checking via `src/middlewares/authorise.ts`
- Supports both endpoint-level and resource-level authorization

### JWT Authentication
The application uses JSON Web Tokens (JWT) for stateless, secure authentication:

**Supported Operations:**
- **Register**: Create new user accounts with email and password
- **Login**: Authenticate users and issue JWT tokens
- **Logout**: (Placeholder, to be implemented)
- **Refresh Token**: (Placeholder, to be implemented)

**Token Management:**
- Access tokens (short-lived) included in Bearer authorization header
- Refresh tokens (long-lived) stored securely in `refresh_tokens` table
- Automatic token validation on protected endpoints

**Implementation:**
- Authentication module: [src/modules/auth/](src/modules/auth/)
  - `auth.controllers.ts` - Login/register endpoints
  - `auth.services.ts` - Token generation and validation
  - `auth.repositories.ts` - User and refresh token persistence
- Middleware: [src/middlewares/authenticate.ts](src/middlewares/authenticate.ts)
  - Validates Bearer tokens in `Authorization` header
  - Attaches user context to request object
  - Rejects expired or malformed tokens

**Bearer Token Usage:**
```
Authorization: Bearer <jwt_access_token>
```

**Database Schema:**
```sql
CREATE TABLE refresh_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMPTZ,
    revoked BOOLEAN DEFAULT FALSE
);
``` 

## Error Handling Strategy
The application implements a centralized error handling strategy using a custom AppError class and a global Express error-handling middleware.

This ensures:
- Consistent error responses across the API
- Separation between operational and programming errors
- Safe error messages sent to clients
- Internal errors hidden in production

### Custom Error Class (AppError)
All expected (operational) errors are represented using a custom error class.
```ts
// src/errors/AppError.ts
class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
```

### Global Error Handler Middleware
```ts
// src/middlewares/errorHandler.ts
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(err);

  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
```

### Benefits of This Approach
- Improves consistency across all endpoints
- Reduces cognitive load in controllers
- Makes the system production-ready
- Prevents leaking internal implementation details

### Future Improvements
- Structured logging (e.g., Winston)
- Environment-based error verbosity
- Error codes (e.g., STUDENT_NOT_FOUND)
- Validation error mapping from Joi
- Database error translation (e.g., unique constraint → 409)


## Pagination, Filtering & Sorting Strategy

Currently implemented for `GET /students` and designed to be reusable for other GET endpoints.

### Pagination

Pagination is implemented using **limit** and **offset** query parameters.

**Query Parameters:**
- `limit` (default: 10)
- `offset` (default: 0)

**Example:**
```
GET /students?limit=20&offset=40
```

**SQL Strategy:**
- `LIMIT` and `OFFSET` are parameterized to prevent SQL injection.
- A separate `COUNT(*)` query is executed to calculate total records.

**Response Structure:**
```json
{
  "data": [...],
  "metadata": {
    "total_page": 120,
    "limit": 10,
    "offset": 0
  }
}
```

### Filtering
Filtering is implemented dynamically using an **allow-list strategy**.

Only explicitly permitted fields can be used as filters.

**Allowed Filters (Students):**
- `first_name`
- `last_name`
- `dob`
- `gender`

**Implementation Strategy:**
- Filters are extracted from query parameters.
- Each allowed field dynamically generates a parameterized `WHERE` clause.
- `ILIKE` is used for partial matching on `first_name` and `last_name`.
- Exact matching is used for `dob` and `gender`.

**Example:**
```
GET /students?first_name=Kev&gender=male
```

Generates:
```sql
WHERE first_name ILIKE $1 AND gender = $2
```

This approach:
- Prevents SQL injection
- Avoids arbitrary column querying
- Keeps filtering extensible and maintainable

### Sorting
Sorting is handled via a `sort` query parameter.

**Syntax Rules:**
- `field` → Ascending order
- `-field` → Descending order
- Multiple fields separated by commas

**Example:**
```
GET /students?sort=first_name,-dob
```

Generates:
```sql
ORDER BY first_name ASC, dob DESC
```

---

### Design Philosophy
This strategy was chosen to:
- Keep controllers thin and clean
- Centralize query-building logic inside the repository layer
- Maintain type safety with DTOs
- Prevent SQL injection via parameterized queries
- Provide a scalable pattern reusable across all entity GET endpoints

Future improvements may include:
- Shared reusable query builder utility
- Cursor-based pagination
- Field allow-list validation for sorting
- Response metadata enhancement (total pages calculation)

This pattern will be extended consistently to all other ```GET``` entity endpoints in the system.

## Database Indexing Strategy

This project applies targeted indexing strategies to optimise foreign key lookups and relational JOIN performance.

### Foreign Key Indexing

Indexes are added to frequently joined foreign key columns to improve query performance:

```sql
CREATE INDEX idx_courses_department_id
ON courses(department_id);

CREATE INDEX idx_instructors_department_id
ON instructors(department_id);

CREATE INDEX idx_majors_department_id
ON majors(department_id);
```

#### Why These Indexes?

- `courses.department_id` → Speeds up joins between courses and departments
- `instructors.department_id` → Optimises department-instructor lookups
- `majors.department_id` → Improves department-major queries

These indexes are particularly important for endpoints such as:
- `GET /departments/:id/courses`
- `GET /departments/:id/instructors`
- `GET /departments/:id/majors`

### Junction Table Considerations (Future Optimisation)

For many-to-many relationship tables (junction tables), PostgreSQL automatically indexes the full composite primary key.

Example:

```sql
PRIMARY KEY (student_id, course_id)
```

However, depending on query patterns, additional indexes on the **right-hand side key** may be added in the future to optimise reverse lookups.

Example (possible future optimisation):

```sql
CREATE INDEX idx_enrollments_course_id
ON enrollments(course_id);
```

This decision will be based on query profiling and real-world performance analysis.


## Enum, Trigger & View Strategy

### Enum

The project uses a PostgreSQL ENUM type for gender instead of a string-based constraint:

```sql
CREATE TYPE gender_enum AS ENUM ('M', 'F');
```

```sql
CREATE TYPE role_enum AS ENUM ('admin','student','instructor');
```

#### Benefits:
- Enforces strict domain-level validation
- Prevents invalid gender values at the database layer
- Improves data integrity

---

### Trigger (Automatic Timestamp Management)

A reusable trigger function ensures `updated_at` is automatically maintained on record updates:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

This function is attached to all major tables via `BEFORE UPDATE` triggers to ensure timestamp consistency without relying on application logic.

---

### View (Planned)

Database views will be introduced to:

- Simplify complex JOIN queries
- Provide pre-aggregated read models
- Support reporting-style endpoints

Example use cases may include:
- Student course summary view
- Instructor teaching workload view
- Department enrollment statistics view

Views will help maintain separation between write models and read-optimised query models.

## Environment Variables

Environment-specific configuration is managed through a centralized configuration module:

**Configuration File:** [src/config/env.ts](src/config/env.ts)

This module exports validated environment variables used throughout the application:
- Database connection URL (with SSL for Neon)
- Server port and API version
- JWT secret keys
- Node environment (development/production)
- CORS and security settings

**Setup:**
Create a `.env` file in the project root with the required variables. Use `.env.example` as a template.

## Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon or local)

### Setup Steps

**1. Install Dependencies**
```bash
npm i
```

**2. Start Development Server**
```bash
npm run dev
```

The server will start on the configured port (default: `http://localhost:3004`) and automatically reload on file changes.

**3. Run Database Migrations**
```bash
npm run migrate
```

This executes all pending migrations in the `database/migrations/` directory.

### Environment Setup
1. Create `.env` file from `.env.example`
2. Configure `DATABASE_URL` pointing to your PostgreSQL instance
3. Set `JWT_SECRET` and other security keys
4. Ensure `NODE_ENV` is set to `development`

## Testing Strategy

### Overview
The project employs a comprehensive testing strategy combining unit tests and integration tests to ensure code quality and reliability.

### Unit Testing
**Framework:** Jest

- Fast, isolated tests for individual functions and methods
- Tests business logic in services and repositories
- Mocked dependencies to avoid external service calls
- Focus on edge cases and error handling

### Integration Testing
**Framework:** Supertest

- Tests complete HTTP request/response cycles
- Validates API endpoints with a real or test database
- Tests middleware chains and error handling
- Ensures database operations work correctly in context

### Test Organization
- Unit tests co-located with source code or in `__tests__` directories
- Integration tests in dedicated test directories
- Test data and fixtures in `mock_records/` or test setup files

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Future Enhancements:**
- Increased test coverage targets (>80%)
- E2E tests for critical user workflows
- Performance/load testing
- Security testing (OWASP compliance)

## Future Improvements