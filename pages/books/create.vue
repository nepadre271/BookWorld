<template>
  <div class="container">
    <h1>Добавить книгу</h1>
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

      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button type="button" @click="$router.back()" class="btn btn-secondary">Отмена</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'  // Импортируем useAuth

const router = useRouter()
const { token } = useAuth()  // Получаем реактивный токен

const form = ref({
  title: '',
  author: '',
  genre: '',
  price: 0,
  available: true,
})

async function submitForm() {
  try {
    if (!token.value) {
      alert('Необходимо авторизоваться')
      router.push('/login')
      return
    }

    const res = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`  // Добавляем токен в заголовок
      },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || 'Ошибка при сохранении')
    }

    router.push('/books')
  } catch (e) {
    alert(e.message)
  }
}
</script>

<style scoped>
/* твои стили без изменений */
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

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #495057;
}
</style>
