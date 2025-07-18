import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '@interfaces/AuthRequest'

interface JwtPayload {
  id: string
  iat: number
  exp: number
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
      req.user = { id: decoded.id }
      next()
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' })
    }
  } else {
    res.status(401).json({ message: 'No autorizado, sin token' })
  }
}
