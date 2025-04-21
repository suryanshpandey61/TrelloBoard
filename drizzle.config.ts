
import dotenv from "dotenv"
import { defineConfig } from 'drizzle-kit';

dotenv.config();

// checking for fetching the url
console.log(process.env.DATABASE_URL);

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url:'neondb_owner:npg_fXtlG7AacpV1@ep-shiny-fire-a4o63vkl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
});
