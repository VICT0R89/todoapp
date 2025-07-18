import { connectDB, closeDB, clearDB } from './setup'

process.env.JWT_SECRET = 'test_secret'

beforeAll(async () => {
  await connectDB()
})

afterEach(async () => {
  await clearDB()
})

afterAll(async () => {
  await closeDB()
})
