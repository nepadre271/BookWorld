import mysql from 'mysql2/promise'
import { faker } from '@faker-js/faker'

const connection = await mysql.createConnection({
    host: 'nedomole.beget.tech',
    user: 'nedomole_db',
    password: 'Q1qqqqqq',
    database: 'nedomole_db',
    port: 3306,
  })

const insertBooks = async () => {
  for (let i = 0; i < 100; i++) {
    await connection.execute(
      `INSERT INTO books (title, description, author, published_at, price, pages, genre, available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faker.lorem.sentence(),
        faker.lorem.paragraph(),
        faker.person.fullName(),
        faker.date.past().toISOString().slice(0, 10),
        faker.finance.amount(5, 100, 2),
        faker.number.int({ min: 100, max: 1000 }),
        faker.helpers.arrayElement(['Fantasy', 'Sci-fi', 'Romance', 'Thriller', 'Non-Fiction']),
        faker.datatype.boolean(),
      ]
    )
  }
}

const insertRecommendations = async () => {
  for (let i = 0; i < 100; i++) {
    await connection.execute(
      `INSERT INTO recommendations (user_name, user_email, book_id, reason, score, created_at, is_active, priority_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faker.person.fullName(),
        faker.internet.email(),
        faker.number.int({ min: 1, max: 100 }),
        faker.lorem.paragraph(),
        faker.number.float({ min: 1.0, max: 5.0, precision: 0.01 }),
        faker.date.recent().toISOString().slice(0, 19).replace('T', ' '),
        faker.datatype.boolean(),
        faker.number.int({ min: 1, max: 5 }),
      ]
    )
  }
}

const insertNovelties = async () => {
  for (let i = 0; i < 100; i++) {
    await connection.execute(
      `INSERT INTO novelties (title, summary, release_date, publisher, editor_email, is_highlighted, popularity, language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faker.commerce.productName(),
        faker.lorem.sentences(),
        faker.date.past().toISOString().slice(0, 10),
        faker.company.name(),
        faker.internet.email(),
        faker.datatype.boolean(),
        faker.number.float({ min: 0.0, max: 10.0, precision: 0.01 }),
        faker.helpers.arrayElement(['English', 'Russian', 'German', 'Spanish']),
      ]
    )
  }
}

const insertReviews = async () => {
  for (let i = 0; i < 100; i++) {
    await connection.execute(
      `INSERT INTO reviews (book_id, reviewer_name, reviewer_email, content, rating, created_at, is_approved, likes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faker.number.int({ min: 1, max: 100 }),
        faker.person.fullName(),
        faker.internet.email(),
        faker.lorem.sentences(),
        faker.number.int({ min: 1, max: 5 }),
        faker.date.recent().toISOString().slice(0, 19).replace('T', ' '),
        faker.datatype.boolean(),
        faker.number.int({ min: 0, max: 1000 }),
      ]
    )
  }
}

await insertBooks()
await insertRecommendations()
await insertNovelties()
await insertReviews()

console.log('✅ Добавлено по 100 записей в каждую из таблиц.')
await connection.end()
