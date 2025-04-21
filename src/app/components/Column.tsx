'use client'

import { Droppable, Draggable } from '@hello-pangea/dnd'
import Task from './Task'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

type Props = {
  columnId: string
  tasks: string[]
  onAddTask: (columnId: string, task: string) => void
}

export default function Column({ columnId, tasks, onAddTask }: Props) {
  const [newTask, setNewTask] = useState('')

  const handleAddTask = () => {
    if (newTask.trim() === '') return
    onAddTask(columnId, newTask.trim())
    setNewTask('')
  }

  return (
    <div className="bg-white rounded-xl p-4 w-1/3 shadow">
      <h2 className="text-xl font-semibold capitalize mb-4">{columnId}</h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <Draggable key={task} draggableId={task} index={index}>
                {(provided) => (
                  <Task provided={provided} task={task} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Only show input & button in the 'todo' column */}
      {columnId === 'todo' && (
        <div className="mt-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
