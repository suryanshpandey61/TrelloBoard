'use client';

import { useEffect, useState } from 'react';
import Column from './Column';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { toast, ToastContainer } from 'react-toastify';

type ColumnType = 'todo' | 'doing' | 'done';

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
        const res = await fetch(`/api/auth/tasks?userId=${userId}`);
        const result = await res.json();

        if (!Array.isArray(result)) {
          console.error('Expected task array, got:', result);
          return;
        }

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
        toast.error('Error while fetching tasks');
        console.error('Error loading tasks:', error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceColumn = active.data.current?.columnId as ColumnType;
    const destinationColumn = over.id as ColumnType;

    if (
      !sourceColumn ||
      !destinationColumn ||
      sourceColumn === destinationColumn
    )
      return;

    const taskToMove = columns[sourceColumn].find(
      (task) => task.id === Number(active.id)
    );
    if (!taskToMove) return;

    setColumns((prev) => {
      const updated = { ...prev };
      updated[sourceColumn] = updated[sourceColumn].filter(
        (t) => t.id !== taskToMove.id
      );
      updated[destinationColumn] = [
        ...updated[destinationColumn],
        { ...taskToMove, columnId: destinationColumn },
      ];
      return updated;
    });

    setHasChanges(true);
  };

  const handleSave = async () => {
    const allTasks = Object.values(columns).flat();

    try {
      const res = await fetch('/api/auth/update-tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: allTasks }),
      });

      if (!res.ok) throw new Error('Save failed');

      toast.success('Changes saved!');
      setHasChanges(false);
    } catch (error) {
      toast.error('Error saving tasks');
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTaskToColumn = (newTask: Task) => {
    setColumns((prev) => ({
      ...prev,
      [newTask.columnId]: [...prev[newTask.columnId], newTask],
    }));
  };

  return (
    <div className="p-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {Object.entries(columns).map(([columnId, taskList]) => (
            <Column
              key={columnId}
              columnId={columnId as ColumnType}
              tasks={taskList}
              userId={userId}
              dndColumnId={columnId}
              onAddTask={handleAddTaskToColumn}
            />
          ))}
        </div>
      </DndContext>

      {hasChanges && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="bg-green-600 cursor-pointer  hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
