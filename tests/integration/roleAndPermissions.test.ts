import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";
import {
  createStudentPermssion,
  readCoursePermission,
  readStudentPermssion,
} from "./permissions.test.js";
import { createSingleAdmin } from "./admin.test.js";
import { adminRole, studentRole } from "./roles.test.js";

// beforeAll(async () => {
//   await clearDatabase();
// });

export async function rolePermissionLinkForAdmin() {
  await adminRole();
  const admin = await createSingleAdmin();
  const permission1 = await createStudentPermssion();
  const permission2 = await readStudentPermssion();
  const link1 = await request(app)
    .post("/api/v1/role-permissions")
    .send({
      role_id: String(admin.body.data.role_id),
      permission_id: String(permission1.body.data.permission_id),
    });
  const link2 = await request(app)
    .post("/api/v1/role-permissions")
    .send({
      role_id: String(admin.body.data.role_id),
      permission_id: String(permission2.body.data.permission_id),
    });

  return { link1, link2 };
}

export async function rolePermissionLinkForStudent() {
  const role = await studentRole();
  const permission = await readCoursePermission();
  return await request(app)
    .post("/api/v1/role-permissions")
    .send({
      role_id: String(role.body.data.role_id),
      permission_id: String(permission.body.data.permission_id),
    });
}

describe("POST /role-permissions", () => {
  beforeEach(async () => {
    await clearDatabase();
  });
  afterEach(async () => {
    await clearDatabase();
  });

  it("Set up CREATE:STUDENT + READ:STUDENT permission for an admin", async () => {
    const { link1, link2 } = await rolePermissionLinkForAdmin();

    expect(link1.statusCode).toBe(201);
    expect(link2.statusCode).toBe(201);
    expect(link1.body.success).toBe(true);
    expect(link2.body.success).toBe(true);
  });

  it("Set up READ:COURSE permission for a student", async () => {
    const link = await rolePermissionLinkForStudent();

    expect(link.statusCode).toBe(201);
    expect(link.body.success).toBe(true);
  });
});
