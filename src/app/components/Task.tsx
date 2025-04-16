'use client'

import { Draggable } from '@hello-pangea/dnd'

interface TaskProps {
  task: string
  index: number
}

export default function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task} index={index}>
      {(provided) => (
        <div
          className="bg-blue-100 rounded p-3 shadow cursor-pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task}
        </div>
      )}
    </Draggable>
  )
}
