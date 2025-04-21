'use client'

type Props = {
  provided: any
  task: string
}

export default function Task({ provided, task }: Props) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-blue-100 rounded p-3 shadow cursor-pointer"
    >
      {task}
    </div>
  )
}
