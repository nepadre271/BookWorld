<template>
  <div class="page-container">
    <h1 class="page-title">Каталог книг</h1>
    
    <button
      v-if="userReady && isAllowed"
      @click="$router.push('/books/create')"
      class="add-button"
    >
      Добавить книгу
    </button>

    <div class="grid">
      <div v-for="book in books" :key="book.id" class="card">
        <div class="image-wrapper">
          <img :src="getRandomImage(book.id)" alt="Обложка книги" class="book-image" />
          <span
            class="availability-badge"
            :class="{ available: book.available, unavailable: !book.available }"
          >
            {{ book.available ? 'В наличии' : 'Нет в наличии' }}
          </span>
        </div>

        <div class="card-content">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-author">
            <i class="fas fa-user"></i> {{ book.author }}
          </p>
          <p class="book-genre">
            <i class="fas fa-book-open"></i> Жанр: <strong>{{ book.genre }}</strong>
          </p>
          <p class="book-price">
            <i class="fas fa-coins"></i> {{ book.price }} ₽
          </p>

          <!-- Кнопка "Редактировать" видна только для авторизованных с ролью -->
          <button
            v-if="userReady && isAllowed"
            @click="$router.push(`/books/${book.id}`)"
            class="edit-button"
          >
            <i class="fas fa-edit"></i> Редактировать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const books = ref([])
const { user } = useAuth()
const userReady = computed(() => !!user.value)

async function fetchBooks() {
  const res = await fetch('/api/books')
  books.value = await res.json()
}

onMounted(fetchBooks)

const isAllowed = computed(() => {
  return user.value && ['developer'].includes(user.value.role)
})

function getRandomImage(bookId) {
  const imageIndex = (bookId % 20) + 1
  return `/images/books/book${imageIndex}.jpg`
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

.page-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 30px;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-6px);
}

.image-wrapper {
  position: relative;
}

.book-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.availability-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  color: #fff;
  background-color: #6c757d;
}

.available {
  background-color: #28a745;
}

.unavailable {
  background-color: #dc3545;
}

.card-content {
  padding: 14px 16px 16px;
  display: grid;
  gap: 8px;
}

.book-title {
  font-size: 1rem;
  font-weight: 700;
  color: #222;
}

.book-author,
.book-genre,
.book-price {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 6px;
}

.edit-button {
  margin-top: 10px;
  align-self: start;
  background-color: #495057;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease;
}

.edit-button:hover {
  background-color: #343a40;
}
</style>
