'use client'

import { useState } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import Column from './Column'

type ColumnType = 'todo' | 'doing' | 'done'

type Columns = {
  [key in ColumnType]: string[]
}

const initialData: Columns = {
  todo: ['Learn Next.js', 'Style with Tailwind'],
  doing: ['Build Trello board'],
  done: ['Setup project'],
}

export default function Board() {
  const [columns, setColumns] = useState<Columns>(initialData)

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Column
            key={columnId}
            columnId={columnId as ColumnType}
            title={columnId}
            tasks={tasks}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
