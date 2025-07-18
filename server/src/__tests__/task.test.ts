import request from 'supertest'
import app from '../app'

describe('Task API', () => {
  let token: string

  beforeAll(async () => {
    // Registrar usuario y obtener token
    const res = await request(app).post('/api/auth/register').send({
      name: 'Tester',
      email: 'tester@tasks.com',
      password: '123456',
    })
    token = res.body.token
  })

  it('POST /api/tasks - debería crear una tarea', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea 1', description: 'Descripción tarea 1' })

    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe('Tarea 1')
    expect(res.body.description).toBe('Descripción tarea 1')
    expect(res.body.completed).toBe(false)
  })

  it('GET /api/tasks - debería obtener tareas del usuario', async () => {
    // Crear tarea antes
    await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea de prueba' })

    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('PUT /api/tasks/:id - debería actualizar una tarea', async () => {
    // Crear tarea primero
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea a actualizar' })

    const taskId = taskRes.body._id

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true })

    expect(res.statusCode).toBe(200)
    expect(res.body.completed).toBe(true)
  })

  it('DELETE /api/tasks/:id - debería eliminar una tarea', async () => {
    // Crear tarea primero
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea a eliminar' })

    const taskId = taskRes.body._id

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/eliminada/i)
  })

  it('GET /api/tasks sin token debería devolver 401', async () => {
    const res = await request(app).get('/api/tasks')
    expect(res.statusCode).toBe(401)
  })
})
