import { useState, useMemo } from 'react'
import type { Task } from '@/interfaces/task.type'

export type TaskStatus = 'all' | 'completed' | 'pending'

export default function useTaskFilter(tasks: Task[]) {
  const [status, setStatus] = useState<TaskStatus>('all')

  const filteredTasks = useMemo(() => {
    if (status === 'all') return tasks
    return tasks.filter(t => t.completed === (status === 'completed'))
  }, [tasks, status])

  return {
    status,
    setStatus,
    filteredTasks
  }
}