import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

config()

const sql = neon('postgresql://neondb_owner:npg_fXtlG7AacpV1@ep-shiny-fire-a4o63vkl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require')
export const db = drizzle(sql)
