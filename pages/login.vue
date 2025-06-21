<!-- pages/login.vue -->
<template>
  <section class="login-page">
    <div class="login-container">
      <div v-if="isAuthenticated()" class="profile">
        <svg class="profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <p class="welcome-text">Добро пожаловать, <strong>{{ user?.email || 'Пользователь' }}</strong>!</p>
        <button class="btn logout-btn" @click="logout">Выйти</button>
      </div>

      <form v-else @submit.prevent="onSubmit" class="login-form">
        <h2 class="form-title">Вход в аккаунт</h2>

        <label for="username" class="input-label">Логин</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Введите ваш логин"
          required
          class="input-field"
        />

        <label for="password" class="input-label">Пароль</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Введите ваш пароль"
          required
          class="input-field"
        />

        <label class="checkbox-container">
          <input type="checkbox" v-model="remember" />
          <span>Запомнить меня</span>
        </label>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <button type="submit" class="btn submit-btn">Войти</button>

        <div class="links">
          <a href="#" class="link">Забыли пароль?</a>
          <a href="#" class="link">Нет аккаунта?</a>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { login, logout, user, isAuthenticated } = useAuth()

const username = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')

const onSubmit = async () => {
  errorMessage.value = ''
  try {
    await login(username.value, password.value)
    router.push('/')
  } catch {
    errorMessage.value = 'Неверный логин или пароль'
  }
}
</script>

<style scoped>
/* Общие стили страницы */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

.login-container {
  background: #fff;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

/* Профиль */
.profile {
  text-align: center;
}

.profile-icon {
  width: 64px;
  height: 64px;
  color: #3b82f6;
  margin-bottom: 16px;
}

.welcome-text {
  font-size: 20px;
  margin-bottom: 24px;
  color: #333;
}

.btn {
  cursor: pointer;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 16px;
  transition: background-color 0.3s ease;
  user-select: none;
}

.logout-btn {
  background-color: #ef4444;
  color: #fff;
}

.logout-btn:hover {
  background-color: #dc2626;
}

/* Форма входа */
.login-form {
  display: flex;
  flex-direction: column;
}

.form-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  color: #111827;
  font-weight: 700;
}

.input-label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #4b5563;
  user-select: none;
}

.input-field {
  padding: 12px 15px;
  border: 1.8px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  outline-offset: 2px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 6px #3b82f6aa;
}

.checkbox-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #374151;
  margin-bottom: 24px;
  user-select: none;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Ошибка */
.error-message {
  color: #dc2626;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}

/* Кнопка Войти */
.submit-btn {
  background-color: #3b82f6;
  color: white;
}

.submit-btn:hover {
  background-color: #2563eb;
}

/* Ссылки */
.links {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}

.link {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease;
  user-select: none;
}

.link:hover {
  color: #2563eb;
}

/* Адаптив */
@media (max-width: 480px) {
  .login-container {
    padding: 30px 25px;
  }
}
</style>
