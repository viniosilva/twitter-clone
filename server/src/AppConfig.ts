import { config } from 'dotenv';
config();

export const apiConfig = {
  host: String(process.env.API_HOST),
  port: Number(process.env.API_PORT),
};

export const mongodbConfig = {
  url: String(process.env.MONGODB_URL),
  dbName: String(process.env.MONGODB_NAME),
};
