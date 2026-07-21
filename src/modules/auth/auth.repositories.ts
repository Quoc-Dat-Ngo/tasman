import { pool } from "../../pool.js";
import type { User, CreateUserDTO } from "../../types/user.types.js";
import type { RefreshToken } from "./jwt_auth/token.types.js";

interface AuthRepository {
  // login(): Promise<TODO ADD SOON>;
  register(newUser: CreateUserDTO): Promise<User>;

  insertRefreshToken(
    id: number,
    token: string,
    expiry: Date,
  ): Promise<RefreshToken>;

  findRefreshTokenByUserId(userId: number): Promise<RefreshToken | null>;
  updateRefreshToken(
    id: number,
    hashed_token: string,
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

  async findRefreshTokenByUserId(userId: number): Promise<RefreshToken | null> {
    return (
      (
        await pool.query<RefreshToken>(
          `
          SELECT *
          FROM refresh_tokens
          WHERE user_id = $1;
        `,
          [userId],
        )
      ).rows[0] ?? null
    );
  }

  async updateRefreshToken(
    id: number,
    hashed_token: string,
    expiry: Date,
  ): Promise<RefreshToken> {
    return (
      await pool.query<RefreshToken>(
        `
          UPDATE refresh_tokens
          SET hashed_token = $1, expires_at = $2
          WHERE token_id = $3
          RETURNING *;
        `,
        [hashed_token, expiry, id],
      )
    ).rows[0]!;
  }
}
