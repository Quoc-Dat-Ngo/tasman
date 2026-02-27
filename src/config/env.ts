import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("Database URL connection string is not defined");
}

if (!process.env.PORT) {
  console.warn("PORT is not defined, use default port - 3004");
}

if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
  throw new Error("Access Token secret key is not defined");
}

if (!process.env.REFRESH_TOKEN_SECRET_KEY) {
  throw new Error("Refresh Token secret key is not defined");
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL + "&sslmode=verify-full",
  PORT: process.env.PORT ?? 3004,
  ACCESS_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
};
