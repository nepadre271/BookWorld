import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [rows] = await connection.execute(`
      SELECT r.id, r.user_name, r.user_email, r.book_id, b.title AS book_title, r.reason, r.score, r.created_at, r.is_active, r.priority_level
      FROM recommendations r
      LEFT JOIN books b ON r.book_id = b.id
      ORDER BY r.created_at DESC
      LIMIT 100
    `)

    await connection.end()
    return rows
  } catch (error) {
    await connection.end()
    throw error
  }
})
