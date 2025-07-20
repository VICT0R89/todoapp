import type { z } from 'zod'
import { loginSchema, registerSchema } from '@/validations/auth.schema'

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthContextProps {
  user: AuthResponse | null
  loading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}