'use client'

import { useState, useEffect } from 'react'
import {
  DragDropContext,
  DropResult,
} from '@hello-pangea/dnd'
import Column from './Column'

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

export default function Board() {
  const [columns, setColumns] = useState<Columns>(defaultData)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setColumns(JSON.parse(saved))
    }
  }, [])

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
      setColumns(prev => ({ ...prev, [sourceCol]: sourceItems }))
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

  const handleAddTask = (columnId: string, task: string) => {
    if (!task.trim()) return
    setColumns(prev => ({
      ...prev,
      [columnId]: [...prev[columnId as ColumnType], task.trim()],
    }))
  }

  return (
    <main className="p-8 bg-main h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Trello Clone</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Column
              key={columnId}
              columnId={columnId}
              tasks={tasks}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </DragDropContext>
    </main>
  )
}
