import bcrypt from 'bcryptjs'
import { Schema, model, Document, Types } from 'mongoose'

export interface IUser extends Document {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// Encriptar password antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Método para comparar password
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)
