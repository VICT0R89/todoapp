import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().pipe(z.email('Correo inválido')),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/, 'El nombre solo puede contener letras y espacios')
    .trim(),
  email: z.string().pipe(z.email('Correo inválido')),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales'
    ),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>