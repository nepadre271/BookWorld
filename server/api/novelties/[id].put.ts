import mysql from 'mysql2/promise'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'ID обязателен' })

  const body = await readBody(event)
  const {
    title,
    summary,
    release_date,
    publisher,
    editor_email,
    is_highlighted,
    popularity,
    language,
  } = body

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [result] = await connection.execute(
      `UPDATE novelties SET 
        title = ?, summary = ?, release_date = ?, publisher = ?, editor_email = ?, is_highlighted = ?, popularity = ?, language = ?
       WHERE id = ?`,
      [title, summary, release_date, publisher, editor_email, is_highlighted ? 1 : 0, popularity, language, id]
    )
    // @ts-ignore
    if (result.affectedRows === 0) throw createError({ statusCode: 404, statusMessage: 'Новинка не найдена' })
    return { success: true }
  } finally {
    await connection.end()
  }
})
