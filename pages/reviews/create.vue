<template>
  <div class="container">
    <h1>Добавить отзыв</h1>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="book_id">Книга</label>
        <select v-model="form.book_id" id="book_id" required>
          <option v-for="book in books" :key="book.id" :value="book.id">{{ book.title }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="reviewer_name">Имя рецензента</label>
        <input v-model="form.reviewer_name" id="reviewer_name" type="text" required />
      </div>

      <div class="form-group">
        <label for="reviewer_email">Email</label>
        <input v-model="form.reviewer_email" id="reviewer_email" type="email" required />
      </div>

      <div class="form-group">
        <label for="content">Содержание</label>
        <textarea v-model="form.content" id="content" rows="5" required></textarea>
      </div>

      <div class="form-group">
        <label for="rating">Рейтинг</label>
        <input v-model.number="form.rating" id="rating" type="number" min="1" max="5" required />
      </div>

      <div class="form-group checkbox">
        <label>
          <input type="checkbox" v-model="form.is_approved" />
          Одобрен
        </label>
      </div>

      <div class="form-group">
        <label for="likes">Лайки</label>
        <input v-model.number="form.likes" id="likes" type="number" min="0" />
      </div>

      <button type="submit" class="btn btn-primary">Создать</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  book_id: null,
  reviewer_name: '',
  reviewer_email: '',
  content: '',
  rating: 1,
  is_approved: false,
  likes: 0,
})
const books = ref([])

async function fetchBooks() {
  const res = await fetch('/api/books')
  books.value = await res.json()
}

async function submit() {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  })

  if (res.ok) {
    router.push('/reviews')
  } else {
    alert('Ошибка при создании отзыва')
  }
}

onMounted(fetchBooks)
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group.checkbox label {
  font-weight: normal;
  display: flex;
  align-items: center;
}

.form-group.checkbox input {
  margin-right: 8px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
