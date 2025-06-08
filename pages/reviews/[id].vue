<template>
  <div class="container" v-if="review">
    <h1>Редактировать отзыв</h1>
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

      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button type="button" class="btn btn-danger" @click="remove">Удалить</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const review = ref(null)
const books = ref([])
const form = ref({
  book_id: null,
  reviewer_name: '',
  reviewer_email: '',
  content: '',
  rating: 1,
  is_approved: false,
  likes: 0,
})

async function fetchReview() {
  const res = await fetch(`/api/reviews/${route.params.id}`)
  if (res.ok) {
    review.value = await res.json()
    Object.assign(form.value, review.value)
  } else {
    alert('Отзыв не найден')
    router.push('/reviews')
  }
}

async function fetchBooks() {
  const res = await fetch('/api/books')
  books.value = await res.json()
}

async function submit() {
  const res = await fetch(`/api/reviews/${route.params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  })

  if (res.ok) {
    router.push('/reviews')
  } else {
    alert('Ошибка при сохранении отзыва')
  }
}

async function remove() {
  if (confirm('Удалить этот отзыв?')) {
    const res = await fetch(`/api/reviews/${route.params.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      router.push('/reviews')
    } else {
      alert('Ошибка при удалении')
    }
  }
}

onMounted(() => {
  fetchReview()
  fetchBooks()
})
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
  margin-right: 10px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #b02a37;
}
</style>
