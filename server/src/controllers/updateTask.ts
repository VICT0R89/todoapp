import { Response } from 'express'
import Task from '@models/Task'
import { AuthRequest } from '@interfaces/AuthRequest'

// Actualizar tarea
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = req.params.id
    const { title, description, completed } = req.body

    // Buscar tarea por id y usuario
    const task = await Task.findOne({ _id: taskId, user: req.user!.id })

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    // Actualizar campos si vienen en body
    if (title !== undefined) task.title = title
    if (description !== undefined) task.description = description
    if (completed !== undefined) task.completed = completed

    const updatedTask = await task.save()
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar tarea' })
  }
}
