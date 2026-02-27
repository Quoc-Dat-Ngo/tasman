import { pool } from "../../pool";
import type { User, CreateUserDTO } from "../../types/user.types";
import type { RefreshToken } from "./jwt_auth/token.types";

interface AuthRepository {
  // login(): Promise<TODO ADD SOON>;
  register(newUser: CreateUserDTO): Promise<User>;

  insertRefreshToken(
    id: number,
    token: string,
    expiry: Date,
  ): Promise<RefreshToken>;
}

export class PoolAuthRepo implements AuthRepository {
  async register(newUser: CreateUserDTO): Promise<User> {
    return (
      await pool.query<User>(
        `
        INSERT INTO users (user_email, user_password, role_id, linked_student_id, linked_instructor_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, DEFAULT, DEFAULT)
        RETURNING *;
      `,
        [
          newUser.user_email,
          newUser.user_password,
          newUser.role_id,
          newUser.linked_student_id,
          newUser.linked_instructor_id,
        ],
      )
    ).rows[0]!;
  }

  async insertRefreshToken(
    id: number,
    token: string,
    expiry: Date,
  ): Promise<RefreshToken> {
    return (
      await pool.query<RefreshToken>(
        `
          INSERT INTO refresh_tokens (user_id, hashed_token, created_at, expires_at)
          VALUES ($1, $2, DEFAULT, $3)
          RETURNING *;
        `,
        [id, token, expiry],
      )
    ).rows[0]!;
  }
}
