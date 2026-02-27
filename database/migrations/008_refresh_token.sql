CREATE TABLE refresh_tokens (
    token_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    hashed_token TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL 
    /* Handle setting expiry date to be automatically 7 days without JS maths
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days')
    */
);

-- Add index for user_id FK for speeding up read-heavy query
CREATE INDEX idx_refresh_tokens_user_id 
ON refresh_tokens(user_id);