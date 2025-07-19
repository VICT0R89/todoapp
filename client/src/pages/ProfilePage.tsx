import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

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

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>

      <div className="max-w-md bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">
          <strong>Nombre:</strong> {user.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  )
}
