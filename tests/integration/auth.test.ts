import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";
import { pool } from "../helpers/db.js";

beforeAll(async () => {
  await setUpRoleAndPermission();
  await createSingleAdmin();
});

afterAll(async () => {
  await clearDatabase();
  await pool.end();
});

async function setUpRoleAndPermission() {
  const adminRole = await request(app).post("/api/v1/roles").send({
    role_name: "admin",
  });

  expect(adminRole.statusCode).toBe(201);
  expect(adminRole.body.success).toBe(true);
  expect(adminRole.body.data).toStrictEqual(
    expect.objectContaining({
      role_id: 1,
      role_name: "admin",
    }),
  );

  const studentRole = await request(app).post("/api/v1/roles").send({
    role_name: "student",
  });
  expect(studentRole.statusCode).toBe(201);
  expect(studentRole.body.success).toBe(true);
  expect(studentRole.body.data).toStrictEqual(
    expect.objectContaining({
      role_id: 2,
      role_name: "student",
    }),
  );

  const instructorRole = await request(app).post("/api/v1/roles").send({
    role_name: "instructor",
  });
  expect(instructorRole.statusCode).toBe(201);
  expect(instructorRole.body.success).toBe(true);
  expect(instructorRole.body.data).toStrictEqual(
    expect.objectContaining({
      role_id: 3,
      role_name: "instructor",
    }),
  );

  const permssion = await request(app).post("/api/v1/permissions").send({
    action: "create",
    resource: "student",
  });

  expect(permssion.statusCode).toBe(201);
  expect(permssion.body.success).toBe(true);
  expect(permssion.body.data).toStrictEqual(
    expect.objectContaining({
      action: "create",
      resource: "student",
    }),
  );

  const rolePermissionLink = await request(app)
    .post("/api/v1/role-permissions")
    .send({
      role_id: String(adminRole.body.data.role_id),
      permission_id: String(permssion.body.data.permission_id),
    });

  expect(rolePermissionLink.statusCode).toBe(201);
  expect(rolePermissionLink.body.success).toBe(true);
  expect(rolePermissionLink.body.data).toStrictEqual(
    expect.objectContaining({
      permission_id: adminRole.body.data.role_id,
      role_id: permssion.body.data.permission_id,
    }),
  );
}

async function createSingleAdmin() {
  const admin = await request(app).post("/api/v1/admin").send({
    user_email: "qngo203@gmail.com",
    user_password: "dat123",
    role_id: 1,
    linked_student_id: null,
    linked_instructor_id: null,
  });
  expect(admin.statusCode).toBe(201);
  expect(admin.body.success).toBe(true);
  expect(admin.body.data).toStrictEqual(
    expect.objectContaining({
      user_id: 1,
      user_email: "qngo203@gmail.com",
      role_id: 1,
      linked_student_id: null,
      linked_instructor_id: null,
    }),
  );
}

describe("POST /auth/register", () => {
  it("Register new user", async () => {
    // Log in via existing single admin that has the permission to create new student
    let res = await request(app).post("/api/v1/auth/login").send({
      email: "qngo203@gmail.com",
      password: "dat123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.email).toEqual("qngo203@gmail.com");

    const newStudent = await request(app)
      .post("/api/v1/students")
      .set("Authorization", `Bearer ${res.body.accessToken}`)
      .send({
        first_name: "Lucas",
        last_name: "Ngo",
        dob: "2004-09-22",
        gender: "M",
      });

    expect(newStudent.statusCode).toBe(201);
    expect(newStudent.body.success).toBe(true);

    const newUser = await request(app).post("/api/v1/auth/register").send({
      first_name: "Lucas",
      last_name: "Ngo",
      email: "duckie@gmail.com",
      password: "duc123",
    });

    expect(newUser.status).toBe(201);
    expect(newUser.body.status).toEqual("success");

    // New user can log in as well
    res = await request(app).post("/api/v1/auth/login").send({
      email: "duckie@gmail.com",
      password: "duc123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.email).toEqual("duckie@gmail.com");
  });
});
