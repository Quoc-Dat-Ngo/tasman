export interface RefreshToken {
  token_id: number;
  user_id: number;
  hashed_token: string;
  created_at: Date;
  expires_at: Date;
}
