'use client'

import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'

type ColumnType = 'todo' | 'doing' | 'done'

type Columns = {
  [key in ColumnType]: string[]
}

const initialData: Columns = {
  todo: ['Learn Next.js', 'Style with Tailwind'],
  doing: ['Build Trello board'],
  done: ['Setup project'],
}

export default function Page() {
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
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Trello Clone</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <div key={columnId} className="bg-white rounded p-4 w-1/3 shadow">
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
            </div>
          ))}
        </div>
      </DragDropContext>
    </main>
  )
}
