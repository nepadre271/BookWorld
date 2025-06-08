import mysql, { ResultSetHeader } from 'mysql2/promise'
import jwt from 'jsonwebtoken'
import { getRequestHeader, createError, readBody } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_for_dev'

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Authorization header missing' })
  }

  const token = authHeader.replace('Bearer ', '')
  let decoded: any
  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }

  if (decoded.role !== 'developer') {
    throw createError({ statusCode: 403, statusMessage: 'Access denied. Developer role required.' })
  }

  const body = await readBody(event)
  console.log('POST /api/books body:', body)
  console.log('User role:', decoded.role)

  const {
    title,
    description = null,
    author,
    published_at = null,
    price = 0,
    pages = null,
    genre = null,
    available = true
  } = body

  if (!title || !author) {
    throw createError({ statusCode: 400, statusMessage: 'Title and author are required' })
  }

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO books (title, description, author, published_at, price, pages, genre, available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, author, published_at, price, pages, genre, available]
    )

    return { id: result.insertId }
  } finally {
    await connection.end()
  }
})
