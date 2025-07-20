import express from 'express'
import { createTask, getTasks, getTaskById } from '@controllers/taskController'
import { updateTask } from '@controllers/updateTask'
import { deleteTask } from '@controllers/deleteTask'
import { protect } from '@middleware/authMiddleware'

const router = express.Router()

// Rutas protegidas
router.post('/', protect, createTask)
router.get('/', protect, getTasks)
router.get('/:id', protect, getTaskById)
router.put('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)

export default router
