import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";
import { adminRole } from "./roles.test.js";

export async function createSingleAdmin() {
  return await request(app).post("/api/v1/admin").send({
    user_email: "qngo203@gmail.com",
    user_password: "dat123",
    role_id: 1,
    linked_student_id: null,
    linked_instructor_id: null,
  });
}

describe("POST /admin", () => {
  beforeEach(async () => {
    await clearDatabase();
    await adminRole();
  });
  afterEach(async () => {
    await clearDatabase();
  });
  it("Insert a new admin", async () => {
    const admin = await createSingleAdmin();

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
  });
});
