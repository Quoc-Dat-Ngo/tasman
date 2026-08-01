import request from "supertest";
import app from "../../src/app.js";
import { clearDatabase } from "../helpers/truncate.js";
import { createSingleAdmin } from "./admin.test.js";
import {
  rolePermissionLinkForAdmin,
  rolePermissionLinkForStudent,
} from "./roleAndPermissions.test.js";
import { adminRole, studentRole } from "./roles.test.js";
import { createStudentPermssion } from "./permissions.test.js";

describe("Authentication + Authorisation Flow", () => {
  describe("Log in existing user", () => {
    beforeEach(async () => {
      await clearDatabase();
      await rolePermissionLinkForAdmin();
    });

    afterEach(async () => {
      await clearDatabase();
    });
    it("POST /auth/login", async () => {
      // Log in via existing single admin that has the permission to create new student
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "qngo203@gmail.com",
        password: "dat123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toEqual("success");
      expect(res.body.email).toEqual("qngo203@gmail.com");
    });
  });

  describe("Accessing a protected endpoint", () => {
    beforeEach(async () => {
      await clearDatabase();
      await rolePermissionLinkForAdmin();
    });

    afterEach(async () => {
      await clearDatabase();
    });
    it("Unauthenticated user - return 401", async () => {
      const res = await request(app).get("/api/v1/courses");

      expect(res.statusCode).toBe(401);
      expect(res.body.status).toEqual("error");
      expect(res.body.message).toEqual("Please log in to access our service");
    });

    it("Authenticated user but insuffient permission - return 403", async () => {
      let res = await request(app).post("/api/v1/auth/login").send({
        email: "qngo203@gmail.com",
        password: "dat123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toEqual("success");
      expect(res.body.email).toEqual("qngo203@gmail.com");

      res = await request(app)
        .get("/api/v1/courses")
        .set("Authorization", `Bearer ${res.body.accessToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body.status).toEqual("error");
      expect(res.body.message).toEqual(
        "Permission is not sufficient to make request",
      );
    });

    it("Authenticated request and authorised user - return 200", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "qngo203@gmail.com",
        password: "dat123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toEqual("success");
      expect(res.body.email).toEqual("qngo203@gmail.com");

      const readStudentsResponse = await request(app)
        .get("/api/v1/students")
        .set("Authorization", `Bearer ${res.body.accessToken}`);

      expect(readStudentsResponse.statusCode).toBe(200);
      expect(readStudentsResponse.body.success).toBe(true);
      expect(readStudentsResponse.body).toStrictEqual({
        data: {
          data: expect.any(Array),
          metadata: expect.any(Object),
        },
        success: true,
      });
    });
  });

  describe("Entire authentication + authorisation flow", () => {
    beforeEach(async () => {
      await clearDatabase();
      await rolePermissionLinkForAdmin();
      await rolePermissionLinkForStudent();
    });

    afterEach(async () => {
      await clearDatabase();
    });
    it("register -> login -> accessing protected route -> refresh token -> logout", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "qngo203@gmail.com",
        password: "dat123",
      });

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
      const login = await request(app).post("/api/v1/auth/login").send({
        email: "duckie@gmail.com",
        password: "duc123",
      });

      expect(login.statusCode).toBe(200);
      expect(login.body.status).toEqual("success");
      expect(login.body.email).toEqual("duckie@gmail.com");
      expect(login.body.accessToken).toEqual(expect.any(String));

      const cookieHeader = login.get("Set-Cookie") ?? [];

      // A student can view all available courses (which is a protected route) after logging in
      const readCourseResponse = await request(app)
        .get("/api/v1/courses")
        .set("Authorization", `Bearer ${login.body.accessToken}`);
      expect(readCourseResponse.statusCode).toBe(200);
      expect(readCourseResponse.body.success).toBe(true);
      expect(readCourseResponse.body).toStrictEqual({
        data: expect.any(Array),
        success: true,
      });

      const refreshTokenResponse = await request(app)
        .post("/api/v1/auth/refresh-token")
        .set("Cookie", cookieHeader);
      expect(refreshTokenResponse.statusCode).toBe(200);
      expect(refreshTokenResponse.body.message).toEqual(
        "New refresh token generated",
      );
      expect(refreshTokenResponse.body.accessToken).toEqual(expect.any(String));

      console.log(login.body.accessToken);

      const logoutResponse = await request(app)
        .post("/api/v1/auth/logout")
        .set("Authorization", `Bearer ${login.body.accessToken}`)
        .set("Cookie", cookieHeader);
      expect(logoutResponse.statusCode).toBe(200);
      expect(logoutResponse.body).toStrictEqual({
        status: "Success",
        message: "Logged out",
      });

      // Still technically work before expiration (15m)
      const read = await request(app)
        .get("/api/v1/courses")
        .set("Authorization", `Bearer ${login.body.accessToken}`);
      expect(read.statusCode).toBe(200);

      // But on refresh will fail
      const failedRefresh = await request(app)
        .post("/api/v1/auth/refresh-token")
        .set("Cookie", cookieHeader); // This cookie session should now be invalidated on the backend

      // This should fail because the backend deleted or invalidated the refresh session
      expect(failedRefresh.statusCode).toBe(401);
      expect(failedRefresh.body).toEqual({
        status: "error",
        message: "Session expired or invalid. Please log in again",
      });
    });
  });
});
