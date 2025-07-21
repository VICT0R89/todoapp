import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from '@config/db'
import app from './app'

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
