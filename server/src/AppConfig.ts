import { config } from 'dotenv';
config();

export const apiConfig = {
  host: String(process.env.API_HOST),
  port: Number(process.env.API_PORT),
  cryptoSecret: String(process.env.CRYPTO_SECRET),
  jwtSecret: String(process.env.JWT_SECRET),
  jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN),
};

export const mongodbConfig = {
  url: String(process.env.MONGODB_URL),
  dbName: String(process.env.MONGODB_NAME),
};
