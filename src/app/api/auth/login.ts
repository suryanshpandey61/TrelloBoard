import { db } from '@/app/db/drizzle'
import { users } from '@/app/db/schema'
import { eq } from 'drizzle-orm'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)



  if (!user.length || user[0].password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Set a simple cookie for session
  const response = NextResponse.json({ user: user[0] })
  response.cookies.set('session_user', JSON.stringify(user[0]), { path: '/' })
  return response
}
