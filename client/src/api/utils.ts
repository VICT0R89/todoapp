const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/g, '') || 'http://localhost:5000/api'

export async function getApi<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    ...init
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error((data as any).message || `Error ${res.status}`)
  return data as T
}