<template>
  <div class="container">
    <h1>Добавить новинку</h1>
    <form @submit.prevent="submit">
      <label>
        Название:
        <input v-model="form.title" type="text" required />
      </label>

      <label>
        Аннотация:
        <textarea v-model="form.summary" rows="4"></textarea>
      </label>

      <label>
        Дата выхода:
        <input v-model="form.release_date" type="date" />
      </label>

      <label>
        Издатель:
        <input v-model="form.publisher" type="text" />
      </label>

      <label>
        Редактор (email):
        <input v-model="form.editor_email" type="email" />
      </label>

      <label>
        Выделена:
        <input v-model="form.is_highlighted" type="checkbox" />
      </label>

      <label>
        Популярность:
        <input v-model.number="form.popularity" type="number" step="0.01" />
      </label>

      <label>
        Язык:
        <input v-model="form.language" type="text" />
      </label>

      <button type="submit" class="btn btn-primary">Создать</button>
      <button type="button" class="btn btn-secondary" @click="$router.back()">Отмена</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  summary: '',
  release_date: '',
  publisher: '',
  editor_email: '',
  is_highlighted: false,
  popularity: 0,
  language: '',
})

async function submit() {
  try {
    const res = await fetch('/api/novelties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('Ошибка создания')
    alert('Новинка добавлена')
    $router.push('/novelties')
  } catch (e) {
    alert(e.message)
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

h1 {
  margin-bottom: 20px;
}

form label {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

form input[type='text'],
form input[type='email'],
form input[type='date'],
form input[type='number'],
form textarea {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  font-size: 1rem;
}

form input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin-top: 6px;
}

button {
  margin-top: 20px;
  margin-right: 10px;
  width: 120px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #495057;
}
</style>
