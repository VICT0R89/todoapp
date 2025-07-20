import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskForm from '@/components/tasks/TaskForm'
import { createTask, fetchTask, updateTask } from '@/api/tasks'
import { useAuth } from '@/context/AuthContext'
import type { Task } from '@/interfaces/task.type'
import Spinner from '@/components/ui/Spinner'
import toast from 'react-hot-toast'

export default function TaskFormPage() {
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

  const handle = async (data: any) => {
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

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-40 gap-2 text-gray-500">
        <Spinner size={24} />
        <span>Cargando tarea...</span>
      </div>
    )
  }

  return <TaskForm initial={initial} onSubmit={handle} loading={loading} />
}
