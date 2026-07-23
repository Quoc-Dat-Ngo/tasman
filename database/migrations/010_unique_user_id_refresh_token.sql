ALTER TABLE refresh_tokens
ADD CONSTRAINT unique_user_id_refresh_token
UNIQUE(user_id);