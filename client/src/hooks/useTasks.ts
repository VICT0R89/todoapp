import { useEffect, useState } from 'react'
import type { Task } from '@/interfaces/task.type'
import { fetchTasks, deleteTask } from '@/api/tasks'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

export default function useTasks() {
  const { user } = useAuth()
  const token = user?.token
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    setLoading(true)
    fetchTasks(token)
      .then(setTasks)
      .catch(() => toast.error('Error al cargar tareas'))
      .finally(() => setLoading(false))
  }, [token])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteTask(id, token!)
      setTasks(tasks.filter(t => t._id !== id))
      toast.success('Tarea eliminada')
    } catch {
      toast.error('Error al eliminar tarea')
    }
    setDeletingId(null)
  }

  return { tasks, loading, deletingId, handleDelete }
}
