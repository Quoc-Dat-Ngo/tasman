# Student Course Management System (University-inspired)

A production-ready REST API for student course management built with Node.js,
Express, and PostgreSQL (Neon). This project demonstrates clean architechure
principles, comprehensive testing, scalable backend development practices. This
project primarily focuses on the relations of mutlti-table schema setup, where
several core relational database skills are utilised such as JOIN, PAGINATION,
FILTERING, SORTING and INDEXING.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Database Integration](#database-integration)
- [API Endpoints](#api-endpoints)

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
│   Services      │ ← Business logic, database operations
├─────────────────┤
│   Database      │ ← Connection pool, queries
├─────────────────┤
│   Middleware    │ ← Validation, logging, error handling
└─────────────────┘
```

### Key Design Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Injection**: Services are injected into controllers
- **Error Handling**: Centralized error handling with custom error classes
- **Validation**: Input validation at multiple layers
- **Testing**: Comprehensive unit and integration tests

## Project Structure

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon serverless)
- **Database Client**: pg (node-postgres)
- **Validation**: Joi
- **Logging**: Morgan
- **Testing**: Jest + Supertest
- **Environment**: dotenv
- **Development**: npx

## Database Integration

### Neon PostgreSQL Setup

The application uses Neon (neon.tech) for serverless PostgreSQL hosting.
Connection is established through:

- **Connection Pooling**: Uses `pg.Pool` for efficient connection management
- **SSL Required**: Neon requires SSL connections
- **Environment Variables**: Database URL stored in `.env`

### Database Configuration

```typescript
// src/database/pool.ts
import { Pool } from 'pg';

const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL + '&sslmode=verify-full',
});
```

### Schema Management

Database schema is managed through migrations and initialization scripts:

- **Auto-initialization**: Database tables created on server startup
- **Updating database**: Modify, add, update database tables using SQL feature
  `ALTER TABLE`.

### Student Schema

```sql
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(1) NOT NULL CHECK (gender IN ('M','F'))
);
```

### Course Schema

```sql
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_title VARCHAR(255) NOT NULL,
    course_code VARCHAR(8) UNIQUE NOT NULL,
    fee NUMERIC(6,2) NOT NULL,
    department_id INTEGER REFERENCES departments(department_id) NOT NULL
);
```

### Instructor Schema

```sql
CREATE TABLE IF NOT EXISTS instructors (
    instructor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(1) NOT NULL CHECK (gender IN ('M','F')),
    department_id INTEGER REFERENCES departments(department_id) NOT NULL
);
```

### Major Schema

```sql
CREATE TABLE IF NOT EXISTS majors (
    major_id SERIAL PRIMARY KEY,
    major_name VARCHAR(255) NOT NULL
);
```

### Department Schema

```sql
CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);
```

### Student-Course (Enrollment) Schema

```sql
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
);
```

### Student-Major Schema

```sql
CREATE TABLE IF NOT EXISTS student_major (
    student_major_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    major_id INTEGER NOT NULL REFERENCES majors(major_id) ON DELETE CASCADE,
    UNIQUE(student_id, major_id)
);
```

### Course-Instructor Schema

```sql
CREATE TABLE IF NOT EXISTS course_instructor (
    course_instructor_id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    instructor_id INTEGER NOT NULL REFERENCES instructors(instructor_id) ON DELETE CASCADE,
    UNIQUE(course_id, instructor_id)
);
```

### Course-Major Schema

```sql
CREATE TABLE IF NOT EXISTS course_major (
    course_major_id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    major_id INTEGER NOT NULL REFERENCES majors(major_id) ON DELETE CASCADE,
    UNIQUE(course_id, major_id)
);
```
## API Endpoints

The API provides complete CRUD operations for task management:

### Base URL
```
http://localhost:3000/api/v1/
```

### Endpoints Overview

**Students:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Retrieve all students |
| POST | `/students` | Create a new student |
| GET | `/students/:id` | Retrieve a specific student |
| PATCH | `/students/:id` | Update a specific student |
| DELETE | `/students/:id` | Delete a specific student |
| GET | `/students/:id/courses` | Get all courses that a student enrolled in |
| GET | `/students/:id/majors` | Get all majors that a student currently takes |

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
| GET | `/courses/:id/majors` | Get all majors that a specific course offers |
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
| GET | `/majors/:id/courses` | Get all courses that offer a particular major |
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