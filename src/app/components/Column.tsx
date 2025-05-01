'use client'

import { useState } from 'react'
import {
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  dndColumnId: string
  onAddTask: (task: Task) => void // 👈 new
}

export default function Column({ columnId, tasks, userId, dndColumnId,onAddTask }: ColumnProps) {
  const [newTask, setNewTask] = useState('')

  // Make this column droppable
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: dndColumnId,
  })

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
  
    try {
      const res = await fetch('/api/auth/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          columnId,
          content: newTask.trim(),
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to add task');
      }
  
      const createdTask: Task = await res.json();
      onAddTask(createdTask); // 👈 Push to parent state
  
      toast.success('Task Added Successfully');
      setNewTask('');
    } catch (error) {
      toast.error("Error while adding the task to db")
      console.error('Error adding task:', error);
    }
  };
  

  return (
    <div className="bg-white rounded-xl p-4 w-1/3 shadow">
      <h2 className="text-xl font-semibold capitalize mb-4">{columnId}</h2>

      {/* DND: Drop zone for this column */}
      <div ref={setDroppableRef} className="space-y-1 min-h-[100px]">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
      </div>

      {/* Input only for TODO column */}
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

// 👇 Task Component made draggable
function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id.toString(),
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-blue-100 rounded p-3 shadow cursor-pointer transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {task.content}
    </div>
  )
}
