import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID не указан' })

  const body = await readBody(event)
  const {
    user_name,
    user_email,
    book_id,
    reason,
    score,
    is_active,
    priority_level,
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
    await connection.execute(
      `UPDATE recommendations SET user_name=?, user_email=?, book_id=?, reason=?, score=?, is_active=?, priority_level=? WHERE id=?`,
      [user_name, user_email, book_id, reason || null, score || null, is_active, priority_level, id]
    )
    await connection.end()
    return { message: 'Обновлено' }
  } catch (error) {
    await connection.end()
    throw error
  }
})
