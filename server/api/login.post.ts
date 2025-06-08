import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mysql, { RowDataPacket } from 'mysql2/promise'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_for_dev'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })
  
  const [rows] = await connection.query<RowDataPacket[]>('SELECT id, password, role FROM users WHERE email = ?', [email])

  await connection.end()

  if (rows.length === 0) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const user = rows[0]
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, email, role: user.role }, JWT_SECRET, { expiresIn: '1h' })


  return { token }
})
