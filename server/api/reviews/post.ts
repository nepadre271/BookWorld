import mysql from 'mysql2/promise'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    book_id,
    reviewer_name,
    reviewer_email,
    content,
    rating,
    is_approved = false,
    likes = 0,
  } = body

  if (!book_id || !reviewer_name || !reviewer_email || !content) {
    throw createError({ statusCode: 400, statusMessage: 'book_id, reviewer_name, reviewer_email и content обязательны' })
  }

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [result] = await connection.execute(
      `INSERT INTO reviews (book_id, reviewer_name, reviewer_email, content, rating, is_approved, likes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        book_id,
        reviewer_name,
        reviewer_email,
        content,
        rating || null,
        is_approved ? 1 : 0,
        likes,
      ]
    )
    await connection.end()
    return { id: (result as any).insertId }
  } catch (error) {
    await connection.end()
    throw error
  }
})
