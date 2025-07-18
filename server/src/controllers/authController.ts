import { Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '@models/User'
import { AuthRequest } from '@interfaces/AuthRequest'

// Generar JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

// Registro
export const registerUser = async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' })

    const user = await User.create({ name, email, password })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

// Login
export const loginUser = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      })
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}
