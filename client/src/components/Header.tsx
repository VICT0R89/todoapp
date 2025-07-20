import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { getInitials } from '@/utils/stringUtils'
import { useRef } from 'react'
import useDropdown from '@/hooks/useDropdown'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const { open, toggle, close } = useDropdown(ref)

  const goToProfile = () => { close(); navigate('/profile') }
  const handleLogout = () => { close(); logout(); navigate('/login') }

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">ToDo App</Link>
        </h1>
        <nav className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Registrarse</Link>
            </>
          ) : (
            <div className="relative" ref={ref}>
              <button
                onClick={toggle}
                title="Menú usuario"
                aria-haspopup="true"
                className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center focus:outline-none"
              >
                {getInitials(user.name)}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg py-2">
                  <button onClick={goToProfile} className="w-full text-left px-4 py-2 hover:bg-gray-100">Perfil</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Cerrar sesión</button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}