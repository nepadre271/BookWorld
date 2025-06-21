<template>
  <div class="reviews-container">
    <header class="header">
      <h1>Отзывы</h1>
      <button
        v-if="userReady && isAllowed"
        @click="$router.push('/reviews/create')"
        class="btn-primary btn-add"
      >
        Добавить отзыв
      </button>
    </header>

    <div class="cards-grid">
      <article v-for="review in reviews" :key="review.id" class="review-card">
        <div class="book-image-wrapper">
          <img
            v-if="review.book_id"
            :src="getBookImage(review.book_id)"
            alt="Обложка книги"
            class="book-image"
            loading="lazy"
          />
          <div v-else class="no-image">—</div>
        </div>

        <div class="review-content">
          <h2 class="book-title" :title="review.book_title || ''">
            {{ review.book_title || 'Без названия' }}
          </h2>

          <div class="reviewer-info">
            <span class="reviewer-name">{{ review.reviewer_name }}</span>
            <a :href="`mailto:${review.reviewer_email}`" class="reviewer-email">
              {{ review.reviewer_email }}
            </a>
          </div>

          <p class="review-text" :title="review.content">{{ review.content }}</p>

          <div class="review-footer">
            <div class="rating" :aria-label="`Рейтинг: ${review.rating} из 5`" role="img">
              <template v-for="i in 5" :key="i">
                <svg
                  class="star"
                  :class="{ filled: i <= review.rating }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"/>
                </svg>
              </template>
            </div>

            <div class="likes">👍 <span>{{ review.likes }}</span></div>

            <div class="approved" :class="{ yes: review.is_approved, no: !review.is_approved }">
              {{ review.is_approved ? 'Одобрен' : 'На проверке' }}
            </div>

            <time class="review-date" :datetime="review.created_at">
              {{ new Date(review.created_at).toLocaleDateString() }}
            </time>
          </div>

          <button
            v-if="userReady && isAllowed"
            class="btn-secondary btn-edit"
            @click="$router.push(`/reviews/${review.id}`)"
            aria-label="Редактировать отзыв"
          >
            ✎ Редактировать
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const reviews = ref([])

async function fetchReviews() {
  const res = await fetch('/api/reviews')
  reviews.value = await res.json()
}

function getBookImage(bookId) {
  if (!bookId) return ''
  const index = (bookId % 20) + 1
  return `/images/books/book${index}.jpg`
}

onMounted(fetchReviews)

// Получаем текущего пользователя и проверяем роль
const { user } = useAuth()

const userReady = computed(() => !!user.value)
const isAllowed = computed(() => user.value?.role === 'developer') // можно поменять роль по нужде
</script>
<style scoped>
.reviews-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 12px;
}

.header h1 {
  font-size: 2.2rem;
  font-weight: 700;
}

.btn-add {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.btn-add:hover {
  background-color: #0056b3;
}

/* Сетка карточек */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Карточка отзыва */
.review-card {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.review-card:hover {
  box-shadow: 0 14px 35px rgba(0,0,0,0.15);
}

.book-image-wrapper {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.review-card:hover .book-image {
  transform: scale(1.05);
}

.no-image {
  font-size: 3rem;
  color: #bbb;
  user-select: none;
}

.review-content {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.book-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  overflow-wrap: anywhere;
}

.reviewer-info {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.reviewer-name {
  font-weight: 600;
}

.reviewer-email {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.reviewer-email:hover {
  text-decoration: underline;
  color: #0056b3;
}

.review-text {
  font-size: 1rem;
  color: #444;
  line-height: 1.4;
  max-height: 4.2em; /* ~3 строки */
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: text;
}

.review-footer {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 0.85rem;
  color: #666;
  flex-wrap: wrap;
  margin-top: auto;
}

.rating {
  display: flex;
  gap: 2px;
  color: #ffc107;
}

.star {
  width: 18px;
  height: 18px;
  fill: #ddd;
  transition: fill 0.3s ease;
}

.star.filled {
  fill: #ffc107;
}

.likes {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #007bff;
}

.approved {
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  user-select: none;
}

.approved.yes {
  background-color: #d4edda;
  color: #155724;
}

.approved.no {
  background-color: #f8d7da;
  color: #721c24;
}

.review-date {
  font-style: italic;
  color: #999;
}

.btn-edit {
  align-self: flex-start;
  margin-top: 14px;
  background-color: #6c757d;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
}

.btn-edit:hover {
  background-color: #495057;
}

@media (max-width: 600px) {
  .review-text {
    max-height: 6em; /* чуть больше строк на узких экранах */
  }
}
</style>
