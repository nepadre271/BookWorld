import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Book id is required' })

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    await connection.execute('DELETE FROM books WHERE id=?', [id])
    return { success: true }
  } finally {
    await connection.end()
  }
})
