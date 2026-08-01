import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";
import { rolePermissionLinkForAdmin } from "./roleAndPermissions.test.js";

describe("Rate limiting on /auth endpoints", () => {
  beforeEach(async () => {
    await clearDatabase();
    await rolePermissionLinkForAdmin();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it("Maximum 10 requests allowed", async () => {
    let res;
    for (let i = 0; i < 50; i++) {
      res = await request(app).post("/api/v1/auth/login").send({
        email: "qngo203@gmail.com",
        password: "dat1234",
      });
    }

    expect(res?.statusCode).toBe(429);
    expect(res?.body).toStrictEqual({
      status: "error",
      message: "Too many requests, please try again later",
    });
  });
});
