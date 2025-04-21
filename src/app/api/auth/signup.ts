import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { email, name, password } = await req.json()
  const existing = await db.select().from(users).where(eq(users.email,email)).limit(1)

  if (existing.length > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  await db.insert(users).values({ email, name, password })
  return NextResponse.json({ message: 'User created' }, { status: 201 })
}
