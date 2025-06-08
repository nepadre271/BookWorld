export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return // middleware не запускаем на сервере

  const token = localStorage.getItem('token')

  if (!token && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }
})
