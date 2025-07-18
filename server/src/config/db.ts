import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI
console.log('MONGO_URI:', process.env.MONGO_URI)

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI no definida en .env')
}

const connectDB = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    console.log('🧪 Usando MongoMemoryServer para tests.')
    return
  }
  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error)
    process.exit(1)
  }
}

export default connectDB

