// Make sure to install the 'pg' package 
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle( pool );
 

