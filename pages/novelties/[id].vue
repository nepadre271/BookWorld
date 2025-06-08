<template>
  <div class="container" v-if="novelty">
    <h1>Редактировать новинку</h1>
    <form @submit.prevent="submit">
      <label>
        Название:
        <input v-model="novelty.title" type="text" required />
      </label>

      <label>
        Аннотация:
        <textarea v-model="novelty.summary" rows="4"></textarea>
      </label>

      <label>
        Дата выхода:
        <input v-model="novelty.release_date" type="date" />
      </label>

      <label>
        Издатель:
        <input v-model="novelty.publisher" type="text" />
      </label>

      <label>
        Редактор (email):
        <input v-model="novelty.editor_email" type="email" />
      </label>

      <label>
        Выделена:
        <input v-model="novelty.is_highlighted" type="checkbox" />
      </label>

      <label>
        Популярность:
        <input v-model.number="novelty.popularity" type="number" step="0.01" />
      </label>

      <label>
        Язык:
        <input v-model="novelty.language" type="text" />
      </label>

      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button type="button" class="btn btn-danger" @click="remove">Удалить</button>
      <button type="button" class="btn btn-secondary" @click="$router.back()">Отмена</button>
    </form>
  </div>
  <div v-else class="container">
    <p>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const $router = useRouter()
const novelty = ref(null)

async function fetchNovelty() {
  const res = await fetch(`/api/novelties/${route.params.id}`)
  if (!res.ok) {
    alert('Новинка не найдена')
    $router.push('/novelties')
    return
  }
  novelty.value = await res.json()
}

async function submit() {
  try {
    const res = await fetch(`/api/novelties/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novelty.value),
    })
    if (!res.ok) throw new Error('Ошибка сохранения')
    alert('Изменения сохранены')
    $router.push('/novelties')
  } catch (e) {
    alert(e.message)
  }
}

async function remove() {
  if (!confirm('Удалить эту новинку?')) return
  try {
    const res = await fetch(`/api/novelties/${route.params.id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Ошибка удаления')
    alert('Новинка удалена')
    $router.push('/novelties')
  } catch (e) {
    alert(e.message)
  }
}

onMounted(fetchNovelty)
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

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #b02a37;
}
</style>
