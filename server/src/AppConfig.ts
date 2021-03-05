import { config } from 'dotenv';
config();

export const apiConfig = {
  environment: String(process.env.NODE_ENV),
  cryptoSecret: String(process.env.API_CRYPTO_SECRET),
  host: String(process.env.API_HOST),
  jwtSecret: String(process.env.API_JWT_SECRET),
  jwtExpiresIn: Number(process.env.API_JWT_EXPIRES_IN),
  logLevel: String(process.env.API_LOG_LEVEL),
  port: Number(process.env.API_PORT),
};

export const mongodbConfig = {
  url: String(process.env.MONGODB_URL),
  dbName: String(process.env.MONGODB_NAME),
};
