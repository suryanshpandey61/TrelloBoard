// src/app/api/tasks/route.ts
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { eq } from "drizzle-orm"
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
  }

  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(tasks.userId.eq(Number(userId)));

    return new Response(JSON.stringify(userTasks), { status: 200 });
  } catch (error) {
    console.error('DB Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
