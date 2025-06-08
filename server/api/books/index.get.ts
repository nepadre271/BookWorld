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
    const [rows] = await connection.execute('SELECT * FROM books ORDER BY id DESC')
    return rows
  } finally {
    await connection.end()
  }
})
