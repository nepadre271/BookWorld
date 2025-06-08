import mysql from 'mysql2/promise'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Book id is required' })

  const body = await readBody(event)
  const { title, description, author, published_at, price, pages, genre, available } = body

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    await connection.execute(
      `UPDATE books SET title=?, description=?, author=?, published_at=?, price=?, pages=?, genre=?, available=? WHERE id=?`,
      [title, description, author, published_at, price, pages, genre, available, id]
    )
    return { success: true }
  } finally {
    await connection.end()
  }
})
