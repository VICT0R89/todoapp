import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask, fetchTask, updateTask } from '@/api/tasks'
import { useAuth } from '@/context/AuthContext'
import type { Task } from '@/interfaces/task.type'
import toast from 'react-hot-toast'

export default function useTaskFormPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const token = user?.token
  const [initial, setInitial] = useState<Task | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(!!id)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      if (id) {
        try {
          const data = await fetchTask(id, token!)
          setInitial(data)
        } catch {
          toast.error('Error al cargar tarea')
        } finally {
          setFetching(false)
        }
      }
    }
    load()
  }, [id, token])

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      if (id) await updateTask(id, data, token!)
      else await createTask(data, token!)
      toast.success(`Tarea ${id ? 'actualizada' : 'creada'} con éxito`)
      navigate('/tasks')
    } catch {
      toast.error('Error al guardar la tarea')
    } finally {
      setLoading(false)
    }
  }

  return {
    initial,
    loading,
    fetching,
    handleSubmit
  }
}
