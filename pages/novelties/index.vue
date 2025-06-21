<template>
  <div class="page-container">
    <h1 class="page-title">Новинки</h1>

    <!-- Кнопка добавления видна только если userReady и isAllowed -->
    <button
      v-if="userReady && isAllowed"
      @click="$router.push('/novelties/create')"
      class="add-button"
    >
      Добавить новинку
    </button>

    <div class="grid">
      <div v-for="item in novelties" :key="item.id" class="card">
        <div class="image-wrapper">
          <img :src="getRandomImage(item.id)" alt="Обложка новинки" class="book-image" />
          <span
            class="highlight-badge"
            :class="{ highlighted: item.is_highlighted, not_highlighted: !item.is_highlighted }"
          >
            {{ item.is_highlighted ? 'Хит сезона' : 'Уже в продаже' }}
          </span>
        </div>

        <div class="card-content">
          <h2 class="book-title">{{ item.title }}</h2>
          <p class="book-summary">{{ item.summary }}</p>

          <p class="detail"><strong>Дата выхода:</strong> {{ new Date(item.release_date).toLocaleDateString() }}</p>
          <p class="detail"><strong>Издатель:</strong> {{ item.publisher }}</p>
          <p class="detail"><strong>Редактор:</strong> {{ item.editor_email }}</p>
          <p class="detail"><strong>Популярность:</strong> {{ item.popularity.toFixed(2) }}</p>
          <p class="detail"><strong>Язык:</strong> {{ item.language }}</p>

          <!-- Кнопка редактирования видна только если userReady и isAllowed -->
          <button
            v-if="userReady && isAllowed"
            @click="$router.push(`/novelties/${item.id}`)"
            class="edit-button"
          >
            <i class="fas fa-edit"></i> Редактировать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'  // Подключаем твой composable

const novelties = ref([])

// Получаем user из useAuth
const { user } = useAuth()
const userReady = computed(() => !!user.value)
const isAllowed = computed(() => user.value && ['developer'].includes(user.value.role))

async function fetchNovelties() {
  const res = await fetch('/api/novelties')
  novelties.value = await res.json()
}

onMounted(fetchNovelties)

function getRandomImage(id) {
  const imageIndex = (id % 20) + 1
  return `/images/books/book${imageIndex}.jpg`
}
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
}

.book-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.highlight-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  color: #fff;
  background-color: #6c757d;
}

.highlighted {
  background-color: #17a2b8;
}

.not_highlighted {
  background-color: #6c757d;
}

.card-content {
  padding: 14px 16px 16px;
  display: grid;
  gap: 8px;
}

.book-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  line-height: 1.2;
}

.book-summary {
  font-size: 0.9rem;
  color: #555;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail {
  font-size: 0.85rem;
  color: #444;
}

.edit-button {
  margin-top: 10px;
  align-self: start;
  background-color: #495057;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease;
}

.edit-button:hover {
  background-color: #343a40;
}
</style>
