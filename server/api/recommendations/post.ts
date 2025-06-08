import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    user_name,
    user_email,
    book_id,
    reason,
    score,
    is_active = true,
    priority_level = 3,
  } = body

  if (!user_name || !user_email || !book_id) {
    throw createError({ statusCode: 400, statusMessage: 'user_name, user_email и book_id обязательны' })
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
      `INSERT INTO recommendations (user_name, user_email, book_id, reason, score, is_active, priority_level)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_name, user_email, book_id, reason || null, score || null, is_active, priority_level]
    )
    await connection.end()
    return { id: (result as any).insertId }
  } catch (error) {
    await connection.end()
    throw error
  }
})
