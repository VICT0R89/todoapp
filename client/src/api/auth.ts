import type { RegisterData, AuthResponse, LoginData } from "@/interfaces/auth.type"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Registro fallido')
  return res.json()
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Login fallido')
  return res.json()
}
