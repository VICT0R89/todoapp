import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '@/validations/task.schema'
import type { TaskInput } from '@/validations/task.schema'

export function useTaskForm(initial?: Partial<TaskInput>) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema) as any
  })

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    reset({
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      completed: initial?.completed ?? false
    })
  }, [initial, reset])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [initial])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return {
    register,
    handleSubmit,
    errors,
    textareaRef,
    handleInput
  }
}
