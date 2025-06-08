<template>
  <div class="container">
    <h1>Новинки</h1>
    <button @click="$router.push('/novelties/create')" class="btn btn-primary">Добавить новинку</button>

    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Аннотация</th>
          <th>Дата выхода</th>
          <th>Издатель</th>
          <th>Редактор</th>
          <th>Выделена</th>
          <th>Популярность</th>
          <th>Язык</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in novelties" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.summary }}</td>
          <td>{{ new Date(item.release_date).toLocaleDateString() }}</td>
          <td>{{ item.publisher }}</td>
          <td>{{ item.editor_email }}</td>
          <td>{{ item.is_highlighted ? 'Да' : 'Нет' }}</td>
          <td>{{ item.popularity.toFixed(2) }}</td>
          <td>{{ item.language }}</td>
          <td>
            <button @click="$router.push(`/novelties/${item.id}`)" class="btn btn-secondary btn-sm">Редактировать</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const novelties = ref([])

async function fetchNovelties() {
  const res = await fetch('/api/novelties')
  novelties.value = await res.json()
}

onMounted(fetchNovelties)
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
  word-wrap: break-word;
}

.table thead th:nth-child(9) { width: 145px; }

.table th,
.table td {
  padding: 10px 12px;
  border: 1px solid #ddd;
  vertical-align: top;
}

.table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.btn {
  cursor: pointer;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 600;
  user-select: none;
  transition: background-color 0.3s ease;
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

.btn-sm {
  padding: 4px 8px;
  font-size: 0.85rem;
}
</style>
