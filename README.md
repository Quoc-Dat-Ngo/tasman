# Tasman — University Course Management REST API

A backend REST API for a university course management system, built with Node.js (TypeScript), Express, and PostgreSQL. The project focuses on backend architecture fundamentals: layered design, a complete JWT auth flow with refresh token rotation, database-backed RBAC, and integration-tested endpoints.

**Live API:** `tasman-production.up.railway.app` *(update after deploy)*  
**ER Diagram:** [View on Lucidchart](https://lucid.app/lucidchart/58de6dd1-7030-4c6c-abe0-e53aaa9c1b43/edit?viewport_loc=-1491%2C-606%2C2932%2C1465%2C0_0&invitationId=inv_39190bf5-33fd-4512-80eb-05ed6e48241a)

---

## Table of Contents

- [Stack](#stack)
- [Architecture](#architecture)
- [Authentication & Authorisation](#authentication--authorisation)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Pagination, Filtering & Sorting](#pagination-filtering--sorting)
- [Testing](#testing)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)

---

## Stack

| Concern | Technology |
|---|---|
| Runtime | Node.js 18+ (TypeScript, ESM) |
| Framework | Express 5 |
| Database | PostgreSQL via `node-postgres` (pg) |
| Auth | JWT (access + refresh), Argon2 password hashing |
| Validation | Zod |
| Rate Limiting | express-rate-limit |
| Testing | Jest + Supertest |
| Logging | Morgan |
| Migrations | Custom SQL runner (`database/migrate.ts`) |

---

## Architecture

The application follows a strict layered architecture. Each layer has one responsibility and dependencies only flow downward.

```
Routes → Controllers → Services → Repositories → Database (Pool)
```

- **Routes** — define endpoints and attach middleware chains
- **Controllers** — parse validated request data, call services, send responses
- **Services** — business logic (token generation, password hashing, existence checks)
- **Repositories** — all SQL queries, parameterised to prevent injection
- **Middlewares** — `authenticate` (JWT verification), `authorise` (RBAC permission check), `validator` (Zod schema), `rateLimiter`, `errorHandler`

### Project Structure

```
tasman/
├── database/
│   ├── migrate.ts              # Migration runner (idempotent, transaction-wrapped)
│   └── migrations/             # Versioned .sql files (001_, 002_, ...)
├── src/
│   ├── app.ts                  # Express app setup, route mounting
│   ├── server.ts               # Server entry point
│   ├── pool.ts                 # pg.Pool singleton
│   ├── config/env.ts           # Zod-validated environment config
│   ├── middlewares/
│   │   ├── authenticate.ts     # Verifies Bearer access token
│   │   ├── authorise.ts        # Checks permission string against JWT payload
│   │   ├── validator.ts        # Zod schema middleware (body, params, query)
│   │   ├── rateLimiter.ts      # express-rate-limit config
│   │   └── errorHandler.ts     # Global error handler
│   ├── modules/
│   │   ├── auth/               # Login, register, logout, refresh-token
│   │   ├── admin/              # Admin user management
│   │   └── authz/              # Roles, permissions, role-permission linking
│   ├── controllers/            # Student, course, instructor, department, major
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── schema/                 # Zod schemas for request validation
│   ├── types/                  # TypeScript interfaces and DTOs
│   ├── errors/                 # AppError class, assertFound helper
│   └── utils/auth.utils.ts     # Token creation, cookie helpers
└── tests/
    ├── helpers/                # setup.ts, globalSetup.ts, db.ts, truncate.ts
    └── integration/            # Auth, RBAC, rate limiter test suites
```

---

## Authentication & Authorisation

### JWT Auth Flow

The API implements a full stateful-refresh / stateless-access token pattern.

```
POST /api/v1/auth/register   — create account (linked to existing student or instructor record)
POST /api/v1/auth/login      — returns access token (JSON) + refresh token (HttpOnly cookie)
POST /api/v1/auth/logout     — clears cookie, deletes refresh token row from DB
POST /api/v1/auth/refresh-token — issues new access + refresh token pair (rotation)
```

**Access token** — short-lived (15 min), sent in `Authorization: Bearer <token>` header. Contains `user_id`, `role`, and `permissions[]` in payload — no extra DB round-trip needed to authorise a request.

**Refresh token** — long-lived (7 days), sent only as an `HttpOnly; Secure; SameSite=None` cookie. The raw token is never stored — only an Argon2 hash is persisted in the `refresh_tokens` table.

**Token rotation** — on `/refresh-token`, the existing row is updated with a new hash and expiry. The old token immediately becomes invalid.

**Logout edge case** — if the refresh token cookie is expired at logout time, the JWT is decoded without verification and the DB row is still deleted. The user is cleanly logged out regardless of token state.

### RBAC Model

Permissions follow an `action:resource` format (e.g. `read:student`, `create:course`). The model uses three tables:

```
roles  ←→  role_permissions  ←→  permissions
```

At login, the user's full permission list is embedded in the JWT payload. The `authorise(permission)` middleware checks this list on every protected route — no DB call required per request.

This means permissions are dynamic (can be changed in DB) but take effect on next login, which is standard for this pattern.

### Rate Limiting

All `/api/v1/auth/*` routes are rate-limited via `express-rate-limit`. The limit is applied before any authentication logic to prevent brute-force attacks on login and excessive registration attempts.

---

## Database Design

Schema is managed by a custom migration runner that wraps each file in a transaction and tracks execution in a `schema_migrations` table. Migrations are idempotent — re-running will skip already-applied files.

```bash
npm run migrate
```

### Key Design Decisions

**PostgreSQL ENUMs** for `gender` (`M`/`F`) and `role` (`admin`/`student`/`instructor`) enforce domain constraints at the DB layer, not just application layer.

**`updated_at` triggers** — a reusable `update_updated_at_column()` PL/pgSQL function is attached as a `BEFORE UPDATE` trigger on all major tables, removing the need to manage timestamps in application code.

**Composite primary keys on junction tables** — `enrollments`, `student_major`, `course_instructor`, and `role_permissions` all use composite PKs, which automatically create covering indexes for the most common lookup direction.

**Additional FK indexes** — explicit indexes on `courses.department_id`, `instructors.department_id`, and `majors.department_id` optimise the `GET /departments/:id/*` family of endpoints.

**Refresh token storage** — raw tokens are never stored; only the Argon2 hash. An index on `refresh_tokens.user_id` speeds up lookup during refresh and logout.

### Schema Summary

| Table | Purpose |
|---|---|
| `students` | Core student records |
| `instructors` | Core instructor records |
| `courses` | Courses with FK to department |
| `departments` | Top-level organisational unit |
| `majors` | Academic majors |
| `enrollments` | Student ↔ Course (M:M) |
| `student_major` | Student ↔ Major (M:M) |
| `course_instructor` | Course ↔ Instructor (M:M) |
| `users` | Login credentials, linked to student or instructor |
| `roles` | Role definitions |
| `permissions` | `action:resource` pairs |
| `role_permissions` | Role ↔ Permission (M:M) |
| `refresh_tokens` | Hashed refresh tokens with expiry |
| `schema_migrations` | Migration execution tracker |

---

## API Endpoints

All routes except `/auth/*` require a valid `Authorization: Bearer <access_token>` header. Access is further gated by the permission attached to each route.

### Auth

| Method | Endpoint | Auth required |
|---|---|---|
| POST | `/api/v1/auth/register` | No |
| POST | `/api/v1/auth/login` | No |
| POST | `/api/v1/auth/logout` | Yes (access token) |
| POST | `/api/v1/auth/refresh-token` | No (refresh cookie) |

### Students

| Method | Endpoint | Permission |
|---|---|---|
| GET | `/api/v1/students` | `read:student` |
| POST | `/api/v1/students` | `create:student` |
| GET | `/api/v1/students/:id` | `read:student` |
| PATCH | `/api/v1/students/:id` | `update:student` |
| DELETE | `/api/v1/students/:id` | `delete:student` |
| GET | `/api/v1/students/:id/courses` | `read:course` |
| GET | `/api/v1/students/:id/majors` | `read:major` |

### Courses

| Method | Endpoint | Permission |
|---|---|---|
| GET | `/api/v1/courses` | `read:course` |
| POST | `/api/v1/courses` | `create:course` |
| GET | `/api/v1/courses/:id` | `read:course` |
| PATCH | `/api/v1/courses/:id` | `update:course` |
| DELETE | `/api/v1/courses/:id` | `delete:course` |
| GET | `/api/v1/courses/:id/students` | `read:student` |
| GET | `/api/v1/courses/:id/instructors` | `read:instructor` |

### Instructors

| Method | Endpoint | Permission |
|---|---|---|
| GET | `/api/v1/instructors` | `read:instructor` |
| POST | `/api/v1/instructors` | `create:instructor` |
| GET | `/api/v1/instructors/:id` | `read:instructor` |
| PATCH | `/api/v1/instructors/:id` | `update:instructor` |
| DELETE | `/api/v1/instructors/:id` | `delete:instructor` |
| GET | `/api/v1/instructors/:id/courses` | `read:course` |

### Departments & Majors

| Method | Endpoint |
|---|---|
| GET/POST | `/api/v1/departments` |
| GET/PATCH/DELETE | `/api/v1/departments/:id` |
| GET | `/api/v1/departments/:id/courses` |
| GET | `/api/v1/departments/:id/instructors` |
| GET | `/api/v1/departments/:id/majors` |
| GET/POST | `/api/v1/majors` |
| GET/PATCH/DELETE | `/api/v1/majors/:id` |

### RBAC Management (Admin only)

| Method | Endpoint |
|---|---|
| GET/POST | `/api/v1/roles` |
| GET/PATCH/DELETE | `/api/v1/roles/:id` |
| GET/POST | `/api/v1/permissions` |
| GET/PATCH/DELETE | `/api/v1/permissions/:id` |
| POST/DELETE | `/api/v1/role-permissions` |
| GET/POST/PATCH/DELETE | `/api/v1/admin` |

---

## Pagination, Filtering & Sorting

Implemented on collection endpoints (e.g. `GET /students`).

**Pagination** — `limit` (default 10) and `offset` (default 0) query params. Response includes a `metadata` object with `total`, `limit`, and `offset`.

**Filtering** — allow-list strategy: only explicitly permitted fields can be filtered. String fields use `ILIKE` for partial matching; enum/date fields use exact match. All values are parameterised.

```
GET /api/v1/students?first_name=kev&gender=M&limit=20&offset=0
```

**Sorting** — `sort` query param. Prefix `-` for descending. Comma-separated for multiple fields.

```
GET /api/v1/students?sort=last_name,-dob
```

Generates: `ORDER BY last_name ASC, dob DESC`

All query building happens in the repository layer; controllers stay thin.

---

## Testing

Integration tests cover the auth flow and RBAC enforcement end-to-end against a real PostgreSQL instance (local Docker container).

```bash
# Start test DB container
npm run container:up

# Run integration tests
npm run test:integration

# Tear down
npm run container:down
```

**Test isolation** — each `describe` block calls `clearDatabase()` in `beforeEach`/`afterEach` to reset state. The test DB is seeded fresh per scenario.

**ESM configuration** — the project uses `"type": "module"` with `"module": "nodenext"` in `tsconfig.json`. Jest is configured with `ts-jest` (`useESM: true`), `extensionsToTreatAsEsm: [".ts"]`, `NODE_OPTIONS=--experimental-vm-modules`, and a `moduleNameMapper` to redirect `.js` imports to `.ts` sources at test time.

**`globalSetup`** — migrations run once before the test suite via Jest's `globalSetup` hook. `setupFiles` loads `.env.test` before any module imports so `pool.ts` connects to the test container rather than the dev database.

### What's tested

| Suite | Coverage |
|---|---|
| `auth.test.ts` | Login, unauthenticated 401, insufficient permission 403, full register → login → protected route → refresh → logout flow |
| `rateLimiter.test.ts` | Auth routes return 429 after limit is exceeded |
| `roles.test.ts`, `permissions.test.ts`, `roleAndPermissions.test.ts` | RBAC management endpoints |
| `admin.test.ts` | Admin user management |

---

## Running Locally

### Prerequisites

- Node.js 18+
- Docker (for test database)
- A PostgreSQL instance (local or cloud) for development

### Setup

```bash
# 1. Clone and install
git clone https://github.com/Quoc-Dat-Ngo/tasman.git
cd tasman
npm install

# 2. Configure environment
cp .env.example .env
# Fill in DATABASE_URL, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY

# 3. Run migrations
npm run migrate

# 4. Start dev server
npm run dev
```

Server starts at `http://localhost:<PORT>` (default 3004) with live reload.

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Server port (default 3004) |
| `ACCESS_TOKEN_SECRET_KEY` | JWT signing secret for access tokens |
| `REFRESH_TOKEN_SECRET_KEY` | JWT signing secret for refresh tokens |
| `NODE_ENV` | `development` / `production` / `test` |

See `.env.example` for the full template.