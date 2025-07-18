import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import taskRoutes from '@routes/taskRoutes'
import authRoutes from '@routes/authRoutes'
import { errorHandler } from '@middleware/errorHandler'

const app: Application = express()

// Middlewares globales
app.use(cors())
app.use(express.json())

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('API funcionando con TypeScript 🚀')
})

// Rutas API
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

// Manejo global de errores
app.use(errorHandler)

export default app
