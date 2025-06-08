<template>
  <div class="container">
    <h1>Список книг</h1>
    <button @click="$router.push('/books/create')" class="btn btn-primary">Добавить книгу</button>

    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Автор</th>
          <th>Жанр</th>
          <th>Цена</th>
          <th>Доступность</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.price }} ₽</td>
          <td>{{ book.available ? 'Да' : 'Нет' }}</td>
          <td>
            <button @click="$router.push(`/books/${book.id}`)" class="btn btn-secondary btn-sm">Редактировать</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const books = ref([])

async function fetchBooks() {
  const res = await fetch('/api/books')
  books.value = await res.json()
}

onMounted(fetchBooks)
</script>

<style scoped>
.container {
  max-width: 900px;
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
}

.table th,
.table td {
  padding: 10px 15px;
  border: 1px solid #ddd;
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
