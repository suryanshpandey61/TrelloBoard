'use client'

import { useState } from 'react'
import { db } from '@/app/db/drizzle'
import { tasks } from '@/app/db/schema' // Correct import of your table schema

type ColumnType = 'todo' | 'doing' | 'done'

type Task = {
  id: number
  userId: number
  columnId: ColumnType
  content: string
}

type ColumnProps = {
  columnId: ColumnType
  tasks: Task[]
  userId: number
}

export default function Column({ columnId, tasks, userId }: ColumnProps) {
  const [newTask, setNewTask] = useState('')

  const handleAddTask = async () => {
    if (!newTask.trim()) return

    try {
      // Insert task into the DB using Drizzle ORM
      await db.insert(tasks).values({
        userId,
        columnId,
        content: newTask.trim(),
      })

      // After insertion, trigger a UI refresh
      window.location.reload() // You can replace this with a more efficient solution like a state change
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setNewTask('')
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 w-1/3 shadow">
      <h2 className="text-xl font-semibold capitalize mb-4">{columnId}</h2>

      <div className="space-y-2 min-h-[100px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-blue-100 rounded p-3 shadow cursor-pointer"
          >
            {task.content}
          </div>
        ))}
      </div>

      {/* Show input only for TODO column */}
      {columnId === 'todo' && (
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
