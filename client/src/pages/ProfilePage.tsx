import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getInitials } from '@/utils/stringUtils'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleTasks = () => navigate('/tasks')
  const initials = getInitials(user.name)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mb-4">
            {initials}
          </div>
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleTasks}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            Ver Mis Tareas
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </main>
  )
}
