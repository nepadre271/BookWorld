import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: number
  email: string
  [key: string]: any
}

const user: Ref<User | null> = ref(null)
const token: Ref<string | null> = ref(process.client ? localStorage.getItem('token') : null)

export function useAuth() {
  const router = useRouter()

  const fetchProfile = async (jwtToken: string): Promise<User> => {
    // Запрос профиля, вернет объект с user
    const res = await $fetch<{ user: User }>('/api/profile', {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return res.user
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await $fetch<{ token: string }>('/api/login', {
        method: 'POST',
        body: { email, password }
      })

      token.value = res.token
      localStorage.setItem('token', res.token)

      user.value = await fetchProfile(res.token)
      router.push('/')
    } catch (err) {
      alert('Login failed')
      throw err
    }
  }

  const register = async (email: string, password: string) => {
    try {
      await $fetch('/api/register', {
        method: 'POST',
        body: { email, password }
      })
      alert('Registered successfully, now login')
      router.push('/login')
    } catch (err) {
      alert('Registration failed')
      throw err
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  const isAuthenticated = () => !!token.value

  return { user, token, login, register, logout, isAuthenticated }
}
