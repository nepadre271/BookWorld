import mysql from 'mysql2/promise'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const { title, summary, release_date, publisher, editor_email, is_highlighted = false, popularity = 0, language } = body

    const [result] = await connection.execute(
      `INSERT INTO novelties (title, summary, release_date, publisher, editor_email, is_highlighted, popularity, language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, summary, release_date, publisher, editor_email, is_highlighted, popularity, language]
    )

    return { id: (result as any).insertId }
  } finally {
    await connection.end()
  }
})
