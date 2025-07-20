import { Response } from 'express'
import Task from '@models/Task'
import { AuthRequest } from '@interfaces/AuthRequest'

// Crear tarea
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body

    const task = new Task({
      title,
      description,
      user: req.user!.id,
    })

    const savedTask = await task.save()
    res.status(201).json(savedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear tarea' })
  }
}

// Obtener todas las tareas del usuario logueado
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id })
    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener tareas' })
  }
}

// Obtener una tarea por ID
export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user!.id
    })

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })

    res.status(200).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener tarea' })
  }
}