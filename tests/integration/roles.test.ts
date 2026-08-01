import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";

export const adminRole = async () => {
  return await request(app).post("/api/v1/roles").send({
    role_name: "admin",
  });
};

export const studentRole = async () => {
  return await request(app).post("/api/v1/roles").send({
    role_name: "student",
  });
};

export const instructorRole = async () => {
  return await request(app).post("/api/v1/roles").send({
    role_name: "instructor",
  });
};

describe("POST /roles", () => {
  beforeEach(async () => {
    await clearDatabase();
  });
  afterEach(async () => {
    await clearDatabase();
  });

  it("Create new admin role", async () => {
    const role = await adminRole();
    expect(role.statusCode).toBe(201);
    expect(role.body.success).toBe(true);
    expect(role.body.data).toStrictEqual(
      expect.objectContaining({
        role_id: 1,
        role_name: "admin",
      }),
    );

    // TODO GET for /roles enpoint
  });

  it("Create new student role", async () => {
    const role = await studentRole();
    expect(role.statusCode).toBe(201);
    expect(role.body.success).toBe(true);
    // TODO GET for /roles enpoint
  });

  it("Create new instructor role", async () => {
    const role = await instructorRole();

    expect(role.statusCode).toBe(201);
    expect(role.body.success).toBe(true);
    // TODO GET for /roles enpoint
  });
});
