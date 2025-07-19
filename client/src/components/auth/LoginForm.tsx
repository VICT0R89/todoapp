import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Spinner from '@/components/ui/Spinner'
import { loginSchema } from '@/validations/auth.schema'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      return
    }

    try {
      await login({ email, password })
      navigate('/')
    } catch {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-1 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-1 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md flex items-center justify-center text-white transition-colors ${
          loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner size={20} />
            <span>Iniciando sesión...</span>
          </div>
        ) : (
          'Iniciar Sesión'
        )}
      </button>
    </form>
  )
}
