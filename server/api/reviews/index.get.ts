import mysql from 'mysql2/promise'

export default defineEventHandler(async () => {
  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [rows] = await connection.execute(`
      SELECT r.*, b.title AS book_title
      FROM reviews r
      LEFT JOIN books b ON r.book_id = b.id
      ORDER BY r.created_at DESC
    `)
    await connection.end()
    return rows
  } catch (error) {
    await connection.end()
    throw error
  }
})
