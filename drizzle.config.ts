import dotenv from "dotenv"
import { defineConfig } from 'drizzle-kit';

dotenv.config();


export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
