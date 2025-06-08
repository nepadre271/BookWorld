<template>
  <div class="container">
    <h1>Рекомендации</h1>
    <button @click="$router.push('/recommendations/create')" class="btn btn-primary">Добавить рекомендацию</button>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Email</th>
            <th>Книга</th>
            <th>Причина</th>
            <th>Оценка</th>
            <th>Активна</th>
            <th>Приоритет</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rec in recommendations" :key="rec.id">
            <td>{{ rec.user_name }}</td>
            <td>{{ rec.user_email }}</td>
            <td>{{ rec.book_title || '—' }}</td>
            <td class="ellipsis">{{ rec.reason }}</td>
            <td>{{ rec.score }}</td>
            <td>{{ rec.is_active ? 'Да' : 'Нет' }}</td>
            <td>{{ rec.priority_level }}</td>
            <td>{{ new Date(rec.created_at).toLocaleDateString() }}</td>
            <td>
              <button @click="$router.push(`/recommendations/${rec.id}`)" class="btn btn-secondary btn-sm">Редактировать</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Recommendation {
  id: number
  user_name: string
  user_email: string
  book_title?: string
  reason: string
  score: number
  is_active: boolean
  priority_level: number
  created_at: string
}

const recommendations = ref<Recommendation[]>([])

async function fetchRecommendations() {
  const res = await fetch('/api/recommendations')
  recommendations.value = await res.json()
}

onMounted(fetchRecommendations)
</script>


<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
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
  vertical-align: middle;
}

.table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.ellipsis {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Скрыть некоторые колонки на узких экранах */
@media (max-width: 768px) {
  .table th:nth-child(4),
  .table td:nth-child(4),
  .table th:nth-child(6),
  .table td:nth-child(6),
  .table th:nth-child(7),
  .table td:nth-child(7) {
    display: none;
  }
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
