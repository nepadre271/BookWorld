<template>
  <div class="page-container">
    <h1 class="page-title">Рекомендации</h1>

    <!-- Кнопка добавления видна только если userReady и isAllowed -->
    <button
      v-if="userReady && isAllowed"
      @click="$router.push('/recommendations/create')"
      class="add-button"
    >
      Добавить рекомендацию
    </button>

    <div class="grid">
      <div v-for="rec in recommendations" :key="rec.id" class="card">
        <div class="image-wrapper">
          <img 
            :src="getBookImage(rec.book_id)" 
            alt="Обложка книги" 
            class="book-image"
            v-if="rec.book_id"
          />
          <div v-else class="no-image">—</div>

          <span class="active-badge" :class="{ active: rec.is_active, inactive: !rec.is_active }">
            {{ rec.is_active ? 'Активна' : 'Неактивна' }}
          </span>
        </div>

        <div class="card-content">
          <h2 class="rec-user">{{ rec.user_name }}</h2>
          <p class="rec-email">
            <i class="fas fa-envelope"></i> {{ rec.user_email }}
          </p>
          <p class="rec-book">
            <i class="fas fa-book"></i> {{ rec.book_title || '—' }}
          </p>
          <p class="rec-reason ellipsis" :title="rec.reason">
            <i class="fas fa-comment"></i> {{ rec.reason }}
          </p>
          <p class="rec-score">
            <i class="fas fa-star"></i> Оценка: <strong>{{ rec.score }}</strong>
          </p>
          <p class="rec-priority">
            <i class="fas fa-exclamation-circle"></i> Приоритет: <strong>{{ rec.priority_level }}</strong>
          </p>
          <p class="rec-date">
            <i class="fas fa-calendar-alt"></i> {{ new Date(rec.created_at).toLocaleDateString() }}
          </p>

          <!-- Кнопка редактирования видна только если userReady и isAllowed -->
          <button
            v-if="userReady && isAllowed"
            @click="$router.push(`/recommendations/${rec.id}`)"
            class="edit-button"
          >
            <i class="fas fa-edit"></i> Редактировать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth' // Подключаем твой useAuth

interface Recommendation {
  id: number
  user_name: string
  user_email: string
  book_id?: number
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

function getBookImage(bookId: number | undefined) {
  if (!bookId) return ''
  const index = (bookId % 20) + 1
  return `/images/books/book${index}.jpg`
}

// Авторизация
const { user } = useAuth()
const userReady = computed(() => !!user.value)
const isAllowed = computed(() => user.value && ['developer'].includes(user.value.role))

onMounted(fetchRecommendations)
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

.page-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 30px;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-6px);
}

.image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  font-size: 4rem;
  color: #bbb;
  user-select: none;
}

.active-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  color: #fff;
  background-color: #6c757d;
  user-select: none;
}

.active {
  background-color: #28a745;
}

.inactive {
  background-color: #dc3545;
}

.card-content {
  padding: 16px;
  display: grid;
  gap: 8px;
}

.rec-user {
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
}

.rec-email,
.rec-book,
.rec-reason,
.rec-score,
.rec-priority,
.rec-date {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.edit-button {
  margin-top: 12px;
  align-self: start;
  background-color: #495057;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
}

.edit-button:hover {
  background-color: #343a40;
}
</style>
