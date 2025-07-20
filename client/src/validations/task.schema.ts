import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().default(false)
})

export type TaskInput = z.infer<typeof taskSchema>