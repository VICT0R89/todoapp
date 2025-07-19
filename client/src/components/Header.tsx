import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getInitials } from '@/utils/stringUtils'

export default function Header() {
  const { user } = useAuth()

  const navigate = useNavigate()
  const handleProfileClick = () => navigate('/profile')

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">ToDo App</Link>
        </h1>
        <nav className="space-x-4 flex items-center">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={handleProfileClick}
              title="Ver perfil"
              aria-label="Ver perfil"
              className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center cursor-pointer select-none"
            >
              {getInitials(user.name)}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
