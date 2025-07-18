import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import connectDB from '@config/db'
import taskRoutes from '@routes/taskRoutes'
import authRoutes from '@routes/authRoutes'
import { errorHandler } from '@middleware/errorHandler'


// Conectar DB
connectDB()

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

// Puerto
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
