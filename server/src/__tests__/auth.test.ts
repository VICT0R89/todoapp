import request from 'supertest'
import app from '../app'

describe('Auth API', () => {
  it('POST /api/auth/register - debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Victor',
        email: 'victor@test.com',
        password: '123456',
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.email).toBe('victor@test.com')
  })

  it('POST /api/auth/login - debería autenticar un usuario', async () => {
    // Registra primero (para asegurar que existe)
    await request(app).post('/api/auth/register').send({
      name: 'Victor',
      email: 'victor2@test.com',
      password: '123456',
    })

    const res = await request(app).post('/api/auth/login').send({
      email: 'victor2@test.com',
      password: '123456',
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.email).toBe('victor2@test.com')
  })

  it('POST /api/auth/register - debería rechazar registro duplicado', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Victor',
      email: 'duplicado@test.com',
      password: '123456',
    })

    const res = await request(app).post('/api/auth/register').send({
      name: 'Victor',
      email: 'duplicado@test.com',
      password: '123456',
    })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toMatch(/existe/i)
  })

  it('POST /api/auth/login - debería rechazar credenciales incorrectas', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Victor',
      email: 'wrongpass@test.com',
      password: '123456',
    })

    const res = await request(app).post('/api/auth/login').send({
      email: 'wrongpass@test.com',
      password: 'wrongpassword',
    })

    expect(res.statusCode).toBe(401)
    expect(res.body.message).toMatch(/inválidas/i)
  })

})
