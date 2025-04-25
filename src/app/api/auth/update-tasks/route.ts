import { db } from '@/db'
import { tasks } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const updatedTasks = body.tasks

  try {
    for (const task of updatedTasks) {
      await db
        .update(tasks)
        .set({ columnId: task.columnId })
        .where(eq(tasks.id, task.id))
    }

    return new Response(JSON.stringify({ message: 'Tasks updated' }), { status: 200 })
  } catch (error) {
    console.error('Update error:', error)
    return new Response(JSON.stringify({ error: 'Failed to update tasks' }), { status: 500 })
  }
}
