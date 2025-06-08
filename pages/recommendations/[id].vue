<template>
  <div class="container" v-if="form">
    <h1>Редактировать рекомендацию</h1>
    <form @submit.prevent="submitForm" class="form">
      <label>
        Имя пользователя:
        <input v-model="form.user_name" required />
      </label>

      <label>
        Email пользователя:
        <input v-model="form.user_email" type="email" required />
      </label>

      <label>
        Книга:
        <select v-model.number="form.book_id" required>
          <option value="" disabled>Выберите книгу</option>
          <option v-for="book in books" :key="book.id" :value="book.id">{{ book.title }}</option>
        </select>
      </label>

      <label>
        Причина:
        <textarea v-model="form.reason"></textarea>
      </label>

      <label>
        Оценка (score):
        <input v-model.number="form.score" type="number" min="0" max="10" step="0.01" />
      </label>

      <label>
        Активна:
        <input type="checkbox" v-model="form.is_active" />
      </label>

      <label>
        Приоритет:
        <select v-model.number="form.priority_level" required>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>

      <div class="buttons">
        <button type="submit" class="btn btn-primary">Сохранить</button>
        <button type="button" @click="deleteItem" class="btn btn-danger">Удалить</button>
        <button type="button" @click="$router.back()" class="btn btn-secondary">Отмена</button>
      </div>
    </form>
  </div>

  <div v-else class="container">
    Загрузка...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = ref(null)
const books = ref([])

async function fetchBooks() {
  const res = await fetch('/api/books')
  books.value = await res.json()
}

async function fetchRecommendation() {
  const res = await fetch(`/api/recommendations/${route.params.id}`)
  if (!res.ok) {
    alert('Не удалось загрузить данные')
    router.push('/recommendations')
    return
  }
  form.value = await res.json()
}

async function submitForm() {
  try {
    const res = await fetch(`/api/recommendations/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Ошибка обновления')
    }

    alert('Обновлено')
    router.push('/recommendations')
  } catch (e) {
    alert(e.message)
  }
}

async function deleteItem() {
  if (!confirm('Удалить эту рекомендацию?')) return
  try {
    const res = await fetch(`/api/recommendations/${route.params.id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Ошибка удаления')
    }

    alert('Удалено')
    router.push('/recommendations')
  } catch (e) {
    alert(e.message)
  }
}

onMounted(() => {
  fetchBooks()
  fetchRecommendation()
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

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: 600;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
}

input[type='text'],
input[type='email'],
input[type='number'],
select,
textarea {
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
}

textarea {
  min-height: 80px;
}

.buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  cursor: pointer;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 600;
  user-select: none;
  transition: background-color 0.3s ease;
  max-width: 140px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #a71d2a;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #495057;
}
</style>
