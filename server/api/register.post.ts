import bcrypt from 'bcrypt'
import mysql, { RowDataPacket } from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  const [rows] = await connection.query<RowDataPacket[]>('SELECT id FROM users WHERE email = ?', [email])
  if (rows.length > 0) {
    await connection.end()
    throw createError({ statusCode: 400, statusMessage: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword])
  await connection.end()

  return { message: 'User registered successfully' }
})
