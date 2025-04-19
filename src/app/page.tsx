'use client'

import { useState, useEffect } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { PlusIcon } from '@heroicons/react/24/solid'

type ColumnType = 'todo' | 'doing' | 'done'

type Columns = {
  [key in ColumnType]: string[]
}

const defaultData: Columns = {
  todo: ['Today I have to learn Drizzle ORM', 'I have to complete the Figma file'],
  doing: ['Learning React JS'],
  done: ['Completed the order login/signup'],
}

const STORAGE_KEY = 'trello-columns'

export default function Page() {
  const [columns, setColumns] = useState<Columns>(defaultData)
  const [newTask, setNewTask] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setColumns(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage when columns change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  }, [columns])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const sourceCol = source.droppableId as ColumnType
    const destCol = destination.droppableId as ColumnType

    const sourceItems = Array.from(columns[sourceCol])
    const [movedItem] = sourceItems.splice(source.index, 1)

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, movedItem)
      setColumns(prev => ({
        ...prev,
        [sourceCol]: sourceItems,
      }))
    } else {
      const destItems = Array.from(columns[destCol])
      destItems.splice(destination.index, 0, movedItem)
      setColumns(prev => ({
        ...prev,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      }))
    }
  }

  const handleAddTask = () => {
    if (newTask.trim() === '') return
    setColumns(prev => ({
      ...prev,
      todo: [...prev.todo, newTask.trim()],
    }))
    setNewTask('')
  }

  return (
    <main className="p-8 bg-main h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Trello Clone</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <div key={columnId} className="bg-white rounded-xl p-4 w-1/3 shadow">
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
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-blue-100 rounded p-3 shadow cursor-pointer"
                          >
                            {task}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Add Task UI only for TODO */}
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
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DragDropContext>
    </main>
  )
}
