import type { TaskInput } from '@/validations/task.schema'

export interface Task extends TaskInput {
  _id: string
  user: string
  createdAt: string
  updatedAt: string
}

export interface TaskFormProps {
  initial?: TaskInput
  onSubmit: (data: TaskInput) => Promise<void>
  loading: boolean
}