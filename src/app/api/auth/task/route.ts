// app/api/tasks/route.ts
import { db } from '@/db'
import { tasks } from '@/db/schema'
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = Number(searchParams.get('userId'))

  const result = await db.select().from(tasks).where(eq(tasks.userId, userId))

  return NextResponse.json(result)
}
