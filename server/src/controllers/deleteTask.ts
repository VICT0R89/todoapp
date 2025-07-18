import { Response } from 'express'
import Task from '@models/Task'
import { AuthRequest } from '@interfaces/AuthRequest'

// Eliminar tarea por id
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = req.params.id

    // Buscar tarea y verificar que exista y pertenezca al usuario logueado
    const task = await Task.findById(taskId)

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })

    if (task.user.toString() !== req.user!.id) return res.status(403).json({ message: 'No autorizado para eliminar esta tarea' })

    await task.deleteOne()

    res.status(200).json({ message: 'Tarea eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar tarea' })
  }
}
