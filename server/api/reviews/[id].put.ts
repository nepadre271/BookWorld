import mysql from 'mysql2/promise'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID не указан' })

  const body = await readBody(event)
  const { book_id, reviewer_name, reviewer_email, content, rating, is_approved, likes } = body

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    await connection.execute(
      `UPDATE reviews SET
        book_id = ?,
        reviewer_name = ?,
        reviewer_email = ?,
        content = ?,
        rating = ?,
        is_approved = ?,
        likes = ?
       WHERE id = ?`,
      [
        book_id,
        reviewer_name,
        reviewer_email,
        content,
        rating || null,
        is_approved ? 1 : 0,
        likes || 0,
        id,
      ]
    )
    await connection.end()
    return { success: true }
  } catch (error) {
    await connection.end()
    throw error
  }
})
