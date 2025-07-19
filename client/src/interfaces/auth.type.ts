export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

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
