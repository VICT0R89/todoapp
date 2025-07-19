import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthContextProps, AuthResponse, LoginData, RegisterData } from '@/interfaces/auth.type'
import { loginUser, registerUser } from '@/api/auth'


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)

  async function login(data: LoginData) {
    setLoading(true)
    try {
      const authResponse = await loginUser(data)
      setUser(authResponse)
      localStorage.setItem('user', JSON.stringify(authResponse))
    } finally {
      setLoading(false)
    }
  }

  async function register(data: RegisterData) {
    setLoading(true)
    try {
      const authResponse = await registerUser(data)
      setUser(authResponse)
      localStorage.setItem('user', JSON.stringify(authResponse))
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
