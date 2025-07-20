import { useAuth } from '@/context/AuthContext'
import TaskList from '@/components/tasks/TaskList'

export default function HomePage() {
  const { user } = useAuth()

  if (user) {
    return <TaskList />
  }

  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-6">Bienvenido a ToDo App</h2>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        Administra tus tareas de forma simple y rápida. Regístrate o inicia sesión para comenzar a
        organizar tu día.
      </p>
    </div>
  )
}