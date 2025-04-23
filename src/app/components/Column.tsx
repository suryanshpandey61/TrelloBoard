import { db } from '@/db'
import { tasks } from '@/db/schema'

const handleAddTask = async () => {
  if (!newTask.trim()) return

  try {
    await db.insert(tasks).values({
      userId,
      columnId,
      content: newTask.trim(),
    })

    // Optional: refresh state instead of reloading
    window.location.reload() 
  } catch (error) {
    console.error('Error adding task:', error)
  } finally {
    setNewTask('')
  }
}
