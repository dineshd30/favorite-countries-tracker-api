import dotenv from 'dotenv';

dotenv.config();

export const DEV = process.env.NODE_ENV === 'dev';
export const TEST = process.env.NODE_ENV === 'test';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

export const SERVER = {
  host: SERVER_HOST,
  port: SERVER_PORT,
}

