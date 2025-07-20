import { useEffect, useState } from 'react'
import type { Task } from '@/interfaces/task.type'
import { fetchTasks, deleteTask } from '@/api/tasks'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '@/components/ui/ConfirmModal'
import toast from 'react-hot-toast'
import Spinner from '@/components/ui/Spinner'

export default function TaskList() {
  const { user } = useAuth()
  const token = user?.token
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetchTasks(token!)
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
    setConfirmId(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        <Spinner size={24} />
        <span className="ml-2">Cargando tareas...</span>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <button
        onClick={() => navigate('/tasks/new')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Nueva tarea
      </button>

      <ul className="space-y-2">
        {tasks.map(t => (
          <li
            key={t._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded shadow-sm"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t.title}</h3>
              {t.description && (
                <p className="text-gray-600">{t.description}</p>
              )}
              <p className={`mt-1 font-bold ${t.completed ? 'text-green-600' : 'text-red-600'}`}>
                {t.completed ? '✅ Completada' : '❌ Pendiente'}
              </p>
            </div>

            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => navigate(`/tasks/${t._id}/edit`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Editar
              </button>
              <button
                disabled={deletingId === t._id}
                onClick={() => setConfirmId(t._id)}
                className={`bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition ${
                  deletingId === t._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {deletingId === t._id ? <Spinner size={16} /> : 'Eliminar'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {confirmId && (
        <ConfirmModal
          message="¿Confirmar eliminación?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}
