import mysql from 'mysql2/promise'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID не указан' })

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [rows] = await connection.execute(
      `SELECT r.*, b.title AS book_title
       FROM reviews r
       LEFT JOIN books b ON r.book_id = b.id
       WHERE r.id = ?`,
      [id]
    )
    await connection.end()
    if ((rows as any[]).length === 0) throw createError({ statusCode: 404, statusMessage: 'Отзыв не найден' })
    return (rows as any)[0]
  } catch (error) {
    await connection.end()
    throw error
  }
})
