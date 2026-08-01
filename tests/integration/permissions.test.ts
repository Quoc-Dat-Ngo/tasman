import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";

// beforeAll(async () => {
//   await clearDatabase();
// });

export const createStudentPermssion = async () => {
  return await request(app).post("/api/v1/permissions").send({
    action: "create",
    resource: "student",
  });
};
export const readStudentPermssion = async () => {
  return await request(app).post("/api/v1/permissions").send({
    action: "read",
    resource: "student",
  });
};

export const readCoursePermission = async function () {
  return await request(app).post("/api/v1/permissions").send({
    action: "read",
    resource: "course",
  });
};

describe("POST /permissions", () => {
  beforeEach(async () => {
    await clearDatabase();
  });
  afterEach(async () => {
    await clearDatabase();
  });

  it("Add new permission for creating student", async () => {
    const permission = await createStudentPermssion();
    expect(permission.statusCode).toBe(201);
    expect(permission.body.success).toBe(true);
    expect(permission.body.data).toStrictEqual(
      expect.objectContaining({
        action: "create",
        resource: "student",
      }),
    );
  });

  it("Add new permission for reading student", async () => {
    const permission = await readStudentPermssion();
    expect(permission.statusCode).toBe(201);
    expect(permission.body.success).toBe(true);
    expect(permission.body.data).toStrictEqual(
      expect.objectContaining({
        action: "read",
        resource: "student",
      }),
    );
  });

  it("Add new permission for reading course", async () => {
    const permission = await readCoursePermission();
    expect(permission.statusCode).toBe(201);
    expect(permission.body.success).toBe(true);
    expect(permission.body.data).toStrictEqual(
      expect.objectContaining({
        action: "read",
        resource: "course",
      }),
    );
  });
});
