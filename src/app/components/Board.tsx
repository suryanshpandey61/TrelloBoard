"use client";

import { useEffect, useState } from "react";
import Column from "./Column";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
type ColumnType = "todo" | "doing" | "done";

type Task = {
  id: number;
  userId: number;
  columnId: ColumnType;
  content: string;
};

type Columns = {
  [key in ColumnType]: Task[];
};

type BoardProps = {
  userId: number;
};

export default function Board({ userId }: BoardProps) {
  const [columns, setColumns] = useState<Columns>({
    todo: [],
    doing: [],
    done: [],
  });

  const [hasChanges, setHasChanges] = useState(false);

  const sensor = useSensor(PointerSensor);
  const sensors = useSensors(sensor);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/tasks?userId=${userId}`);
        const data: Task[] = await res.json();
  
        const organized = { todo: [], doing: [], done: [] } as Columns;
        data.forEach((task) => organized[task.columnId].push(task));
        setColumns(organized);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      }
    };
    fetchTasks();
  }, [userId]);
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const sourceColumn = active.data.current?.columnId as ColumnType;
    const destinationColumn = over.id as ColumnType;
  
    if (!sourceColumn || !destinationColumn || sourceColumn === destinationColumn) return;
  
    const taskToMove = columns[sourceColumn].find((task) => task.id === Number(active.id));
    if (!taskToMove) return;
  
    setColumns((prev) => {
      const updated = { ...prev };
      updated[sourceColumn] = updated[sourceColumn].filter((t) => t.id !== taskToMove.id);
      updated[destinationColumn] = [
        ...updated[destinationColumn],
        { ...taskToMove, columnId: destinationColumn },
      ];
      return updated;
    });
  
    // Optional: Send updated task to DB
    fetch('/api/auth/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...taskToMove,
        columnId: destinationColumn, // new column
      }),
    }).catch(console.error);
  };
  

  const handleSave = async () => {
    const allTasks = Object.values(columns).flat()

    try {
      const res = await fetch('/api/auth/update-tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: allTasks }),
      })

      if (!res.ok) throw new Error('Save failed')

      setHasChanges(false)
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }

  return (
    <div className="p-4">
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4">
        {Object.entries(columns).map(([columnId, taskList]) => (
          <Column
            key={columnId}
            columnId={columnId as ColumnType}
            tasks={taskList}
            userId={userId}
            dndColumnId={columnId} // Pass it for droppable area
          />
        ))}
      </div>
    </DndContext>

    {hasChanges && (
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    )}
  </div>
  );
}
