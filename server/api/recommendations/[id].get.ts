import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Recommendation id is required' })

  const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

  try {
    const [rows] = await connection.execute('SELECT * FROM recommendations WHERE id = ? LIMIT 1', [id])
    if ((rows as any[]).length === 0) throw createError({ statusCode: 404, statusMessage: 'Recommendation not found' })
    return (rows as any)[0]
  } finally {
    await connection.end()
  }
})
