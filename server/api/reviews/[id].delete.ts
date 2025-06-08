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
    await connection.execute(`DELETE FROM reviews WHERE id=?`, [id])
    await connection.end()
    return { message: 'Удалено' }
  } catch (error) {
    await connection.end()
    throw error
  }
})
