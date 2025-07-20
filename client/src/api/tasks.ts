import type { Task } from '@/interfaces/task.type'
import type { TaskInput } from '@/validations/task.schema'
import { getApi } from '@/api/utils'

export function fetchTasks(token: string): Promise<Task[]> {
  return getApi<Task[]>('/tasks', token)
}

export function fetchTask(id: string, token: string): Promise<Task> {
  return getApi<Task>(`/tasks/${id}`, token)
}

export function createTask(data: TaskInput, token: string): Promise<Task> {
  return getApi<Task>('/tasks', token, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function updateTask(id: string, data: TaskInput, token: string): Promise<Task> {
  return getApi<Task>(`/tasks/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function deleteTask(id: string, token: string): Promise<void> {
  return getApi<void>(`/tasks/${id}`, token, {
    method: 'DELETE'
  })
}