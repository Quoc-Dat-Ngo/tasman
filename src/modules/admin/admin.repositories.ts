import { pool } from "../../pool.js";
import type { CreateUserDTO, User } from "../../types/user.types.js";

interface AdminRepository {
  create(data: CreateUserDTO): Promise<User>;
  checkUserExistence(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
}

export class PoolAdminRepo implements AdminRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return (
      await pool.query<User>(
        `
        INSERT INTO users (user_email, user_password, role_id, linked_student_id, linked_instructor_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, DEFAULT, DEFAULT)
        RETURNING *;
      `,
        [
          data.user_email,
          data.user_password,
          data.role_id,
          data.linked_student_id,
          data.linked_instructor_id,
        ],
      )
    ).rows[0]!;
  }
  async checkUserExistence(email: string): Promise<User | null> {
    return (
      (
        await pool.query<User>(
          `
        SELECT *
        FROM users 
        WHERE user_email = $1;
      `,
          [email],
        )
      ).rows[0] ?? null
    );
  }
  async findUserById(id: number): Promise<User | null> {
    return (
      (
        await pool.query<User>(
          `
        SELECT * 
        FROM users
        WHERE  user_id = $1;
      `,
          [id],
        )
      ).rows[0] ?? null
    );
  }
}
