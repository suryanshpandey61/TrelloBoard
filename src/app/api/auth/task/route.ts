//adding task api
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, columnId, content } = body;

  if (!userId || !columnId || !content) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  try {
    const insertedTask = await db
      .insert(tasks)
      .values({ userId: Number(userId), columnId, content })
      .returning();

    const createdTask = insertedTask[0];
    return new Response(JSON.stringify(createdTask), { status: 201 });
  } catch (error) {
    console.error('DB Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
