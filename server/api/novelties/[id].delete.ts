import mysql from 'mysql2/promise'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID обязателен' })

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [result] = await connection.execute('DELETE FROM novelties WHERE id = ?', [id])
    // @ts-ignore
    if (result.affectedRows === 0) throw createError({ statusCode: 404, statusMessage: 'Новинка не найдена' })
    return { success: true }
  } finally {
    await connection.end()
  }
})
