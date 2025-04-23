'use client'

import { useState } from 'react'
import { db } from '@/db'
import { tasks as tasksTable } from '@/db/schema'

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
      await db.insert(tasksTable).values({
        userId,
        columnId,
        content: newTask.trim(),
      })

      // Temporary: reload the page. (Later, update the state instead!)
      window.location.reload()
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
