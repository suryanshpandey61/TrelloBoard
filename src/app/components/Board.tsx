'use client'

import { useEffect, useState } from 'react'
import { db } from '@/db/'
import { tasks } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Column from './Column'

type ColumnType = 'todo' | 'doing' | 'done'

type Task = {
  id: number
  userId: number
  columnId: ColumnType
  content: string
}

type Columns = {
  [key in ColumnType]: Task[]
}

type BoardProps = {
  userId: number
}

export default function Board({ userId }: BoardProps) {
  const [columns, setColumns] = useState<Columns>({
    todo: [],
    doing: [],
    done: [],
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/tasks?userId=${userId}`);
        const result: Task[] = await res.json();
  
        const organizedTasks: Columns = {
          todo: [],
          doing: [],
          done: [],
        };
  
        for (const task of result) {
          if (['todo', 'doing', 'done'].includes(task.columnId)) {
            organizedTasks[task.columnId as ColumnType].push(task);
          }
        }
  
        setColumns(organizedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
  
    fetchTasks();
  }, [userId]);
  

  return (
    <div className="flex gap-4">
      {Object.entries(columns).map(([columnId, taskList]) => (
        <Column
          key={columnId}
          columnId={columnId as ColumnType}
          tasks={taskList}
          userId={userId}
        />
      ))}
    </div>
  )
}
