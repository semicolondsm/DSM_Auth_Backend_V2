import "dotenv/config";

export const ACCESS_TOKEN_EXPIRED_TIME = process.env.ACCESS_TOKEN_EXPIRED_TIME;
export const REFRESH_TOKEN_EXPIRED_TIME =
  process.env.REFRESH_TOKEN_EXPIRED_TIME;
export const JWT_SECRET_KEY = process.env.JWT_SECRET;
export const REFRESH_TOKEN_HEADER = "x-refresh-token";
