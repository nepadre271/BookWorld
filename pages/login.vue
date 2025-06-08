<!-- pages/login.vue -->
<template>
  <div>
    <body class="u-body u-xl-mode" data-style="login-template-1" data-posts="" data-global-section-properties="{&quot;code&quot;:&quot;LOGIN&quot;,&quot;colorings&quot;:{&quot;light&quot;:[&quot;clean&quot;,&quot;clean&quot;],&quot;colored&quot;:[&quot;clean&quot;,&quot;clean&quot;,&quot;clean&quot;],&quot;dark&quot;:[&quot;clean&quot;,&quot;clean&quot;,&quot;clean&quot;]},&quot;isPreset&quot;:true}" data-source="fix" data-lang="ru" data-page-sections-style="[{&quot;name&quot;:&quot;login-form-1&quot;,&quot;margin&quot;:&quot;both&quot;,&quot;repeat&quot;:false}]" data-page-coloring-types="{&quot;light&quot;:[&quot;clean&quot;,&quot;clean&quot;],&quot;colored&quot;:[&quot;clean&quot;,&quot;clean&quot;,&quot;clean&quot;],&quot;dark&quot;:[&quot;clean&quot;,&quot;clean&quot;,&quot;clean&quot;]}" data-page-category="&quot;Login&quot;"><section class="u-align-center u-clearfix u-container-align-center u-block-2004-1" custom-posts-hash="T" data-section-properties="{&quot;margin&quot;:&quot;both&quot;,&quot;stretch&quot;:true}" data-id="2004" data-style="login-form-1" id="block-1" data-outline-name="Блок 1">
  <div class="u-clearfix u-sheet u-valign-middle-xl u-valign-top-lg u-valign-top-md u-valign-top-sm u-valign-top-xs u-block-2004-2">
    <div v-if="isAuthenticated()" class="centered-container">
        <p class="u-text">Добро пожаловать, {{ user?.email || 'Пользователь' }}!</p>
        <button class="u-btn u-button-style" @click="logout">Выйти</button>
    </div>

    <div v-else>
    <div class="u-form u-login-control u-block-2004-24">
      <form
          class="u-form u-form-custom-backend u-form-spacing-10 u-form-vertical"
          @submit.prevent="onSubmit"
        >
          <div class="u-form-group u-form-name">
            <label for="username">Логин</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Введите ваш логин"
              class="u-input u-input-rectangle"
              required
            />
          </div>

          <div class="u-form-group u-form-password">
            <label for="password">Пароль</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Введите ваш пароль"
              class="u-input u-input-rectangle"
              required
            />
          </div>

          <div class="u-form-checkbox u-form-group">
            <input
              id="remember"
              type="checkbox"
              v-model="remember"
              class="u-field-input"
            />
            <label for="remember" class="u-field-label">Запомнить меня</label>
          </div>

          <div v-if="errorMessage" class="u-text u-text-danger">{{ errorMessage }}</div>

          <div class="u-align-left u-form-group u-form-submit">
            <button type="submit" class="u-btn u-btn-submit u-button-style">Войти</button>
          </div>
        </form>
    </div>
    <a href="#" class="u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-btn u-button-style u-login-control u-login-forgot-password u-none u-text-palette-1-base u-block-2004-21">Забыли пароль?</a>
    <a href="#" class="u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-border-no-left u-border-no-right u-border-no-top u-btn u-button-style u-login-control u-login-create-account u-none u-text-palette-1-base u-block-2004-23">Нет аккаунта?</a>
  </div>
  </div>
</section>
</body>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
    router.push('/') // или оставь как есть
  } catch (e) {
    errorMessage.value = 'Неверный логин или пароль'
  }
}
</script>


<style scoped>
.centered-container {
    text-align: center;
}

@media (min-width: 1200px) {
  .u-block-2004-2 {
    min-height: 692px;
  }
  .u-block-2004-35 {
    width: 212px;
    height: 212px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-24 {
    width: 570px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
  }
  .u-block-2004-27 {
    background-image: none;
  }
  .u-block-2004-30 {
    background-image: none;
  }
  .u-block-2004-34 {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-21 {
    border-style: solid;
    margin-top: 30px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-23 {
    border-style: solid;
    margin-top: 30px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 32px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
}</style>
  <style data-mode="LG">@media (max-width: 1199px) and (min-width: 992px) {
  .u-block-2004-2 {
    min-height: 692px;
  }
  .u-block-2004-35 {
    width: 212px;
    height: 212px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-24 {
    width: 570px;
    margin-top: 30px;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;
  }
  .u-block-2004-27 {
    background-image: none;
  }
  .u-block-2004-30 {
    background-image: none;
  }
  .u-block-2004-34 {
    width: 100%;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 10px;
    padding-left: 0;
  }
  .u-block-2004-21 {
    border-style: solid;
    align-self: center;
    margin-top: 30px;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 185px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-23 {
    border-style: solid;
    margin-top: 30px;
    margin-right: 185px;
    margin-bottom: 32px;
    margin-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
}</style>
  <style data-mode="MD">@media (max-width: 991px) and (min-width: 768px) {
  .u-block-2004-2 {
    min-height: 692px;
  }
  .u-block-2004-35 {
    width: 212px;
    height: 212px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-24 {
    width: 570px;
    margin-top: 30px;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;
  }
  .u-block-2004-27 {
    background-image: none;
  }
  .u-block-2004-30 {
    background-image: none;
  }
  .u-block-2004-34 {
    width: 100%;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 10px;
    padding-left: 0;
  }
  .u-block-2004-21 {
    border-style: solid;
    align-self: center;
    margin-top: 30px;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 75px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-23 {
    border-style: solid;
    margin-top: 30px;
    margin-right: 75px;
    margin-bottom: 32px;
    margin-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
}</style>
  <style data-mode="SM">@media (max-width: 767px) and (min-width: 576px) {
  .u-block-2004-2 {
    min-height: 692px;
  }
  .u-block-2004-35 {
    width: 212px;
    height: 212px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-24 {
    width: 540px;
    margin-top: 30px;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;
  }
  .u-block-2004-27 {
    background-image: none;
  }
  .u-block-2004-30 {
    background-image: none;
  }
  .u-block-2004-34 {
    width: 100%;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 10px;
    padding-left: 0;
  }
  .u-block-2004-21 {
    border-style: solid;
    margin-top: 30px;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    align-self: center;
  }
  .u-block-2004-23 {
    border-style: solid;
    margin-bottom: 32px;
    margin-top: 30px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
}</style>
  <style data-mode="XS">@media (max-width: 575px) {
  .u-block-2004-2 {
    min-height: 692px;
  }
  .u-block-2004-35 {
    width: 212px;
    height: 212px;
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .u-block-2004-24 {
    width: 340px;
    margin-top: 30px;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;
  }
  .u-block-2004-27 {
    background-image: none;
  }
  .u-block-2004-30 {
    background-image: none;
  }
  .u-block-2004-34 {
    width: 100%;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 10px;
    padding-left: 0;
  }
  .u-block-2004-21 {
    border-style: solid;
    margin-top: 30px;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    align-self: center;
  }
  .u-block-2004-23 {
    border-style: solid;
    margin-bottom: 32px;
    margin-top: 30px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>