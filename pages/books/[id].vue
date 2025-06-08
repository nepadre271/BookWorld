<template>
  <div class="container">
    <h1>Редактировать книгу</h1>
    <form @submit.prevent="submitForm" class="form">
      <label>
        Название:
        <input v-model="form.title" required />
      </label>

      <label>
        Автор:
        <input v-model="form.author" />
      </label>

      <label>
        Жанр:
        <input v-model="form.genre" />
      </label>

      <label>
        Цена:
        <input v-model.number="form.price" type="number" step="0.01" />
      </label>

      <label>
        Доступна:
        <input v-model="form.available" type="checkbox" />
      </label>

      <div class="buttons">
        <button type="submit" class="btn btn-primary">Сохранить</button>
        <button type="button" @click="deleteBook" class="btn btn-danger">Удалить</button>
        <button type="button" @click="$router.back()" class="btn btn-secondary">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
  title: '',
  author: '',
  genre: '',
  price: 0,
  available: true,
})

async function fetchBook() {
  const res = await fetch(`/api/books/${id}`)
  if (!res.ok) {
    alert('Книга не найдена')
    router.push('/books')
    return
  }
  const data = await res.json()
  form.value = {
    title: data.title,
    author: data.author,
    genre: data.genre,
    price: data.price,
    available: data.available,
  }
}

async function submitForm() {
  try {
    const res = await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error('Ошибка при сохранении')
    router.push('/books')
  } catch (e) {
    alert(e.message)
  }
}

async function deleteBook() {
  if (!confirm('Удалить эту книгу?')) return
  try {
    const res = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Ошибка при удалении')
    router.push('/books')
  } catch (e) {
    alert(e.message)
  }
}

onMounted(fetchBook)
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
input[type='number'] {
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
  font-size: 1rem;
}

input[type='checkbox'] {
  width: 20px;
  height: 20px;
  margin-top: 6px;
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
