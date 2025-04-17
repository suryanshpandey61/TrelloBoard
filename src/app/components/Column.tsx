'use client'

import { Droppable } from '@hello-pangea/dnd'
import Task from './Task'

interface ColumnProps {
  columnId: string
  title: string
  tasks: string[]
}

export default function Column({ columnId, title, tasks }: ColumnProps) {
  return (
    <div className="bg-white rounded p-2 w-1/3 shadow">
      <h2 className="text-xl font-semibold capitalize mb-4">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <Task key={task} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
