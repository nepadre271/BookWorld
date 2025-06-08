<template>
  <div class="container">
    <h1>Отзывы</h1>
    <button @click="$router.push('/reviews/create')" class="btn btn-primary">Добавить отзыв</button>

    <table class="table">
      <thead>
        <tr>
          <th>Книга</th>
          <th>Имя рецензента</th>
          <th>Email</th>
          <th>Содержание</th>
          <th>Рейтинг</th>
          <th>Одобрен</th>
          <th>Лайки</th>
          <th>Дата</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in reviews" :key="review.id">
          <td>{{ review.book_title || '—' }}</td>
          <td>{{ review.reviewer_name }}</td>
          <td>{{ review.reviewer_email }}</td>
          <td>{{ review.content }}</td>
          <td>{{ review.rating }}</td>
          <td>{{ review.is_approved ? 'Да' : 'Нет' }}</td>
          <td>{{ review.likes }}</td>
          <td>{{ new Date(review.created_at).toLocaleDateString() }}</td>
          <td>
            <button @click="$router.push(`/reviews/${review.id}`)" class="btn btn-secondary btn-sm">Редактировать</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const reviews = ref([])

async function fetchReviews() {
  const res = await fetch('/api/reviews')
  reviews.value = await res.json()
}

onMounted(fetchReviews)
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

.table thead th:nth-child(9) { width: 145px; }

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
  word-wrap: break-word;
}

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
