<template>
  <div class="login-container">
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-xl w-full p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium">Username</label>
            <input v-model="username" type="text" id="username" class="mt-1 p-2 border rounded-md w-full" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input v-model="password" type="password" id="password" class="mt-1 p-2 border rounded-md w-full" required>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" :disabled="isLoading">Log In</button>
          <div v-if="isLoading" class="text-center mt-2">
            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
            Logging in...
          </div>
          <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore' // Adjust path as needed
import { ref } from 'vue' // For reactive properties
import axios from 'axios'
import router from '../router' // Adjust path as needed

export default {
  setup() {
    const userStore = useUserStore()
    const username = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const error = ref(null)

    const login = async () => {
      isLoading.value = true
      error.value = null

      try {
        const response = await axios.post('/api/login', {
          username: username.value,
          password: password.value,
        });

        // Use setUser action to update user state
        userStore.setUser(response.data.user_name, response.data.role_id)
        console.log(response.data.role_id);
        console.log( userStore);

        // Conditional redirection based on role_id
        if (response.data.role_id == 1) {
          router.push({ path: '/admin' }); // Redirect to admin dashboard
        } else if (response.data.role_id == 2) {
          router.push({ path: '/' }); // Redirect to home page
        }
      } catch (err) {
        console.error('Login failed:', err);
        error.value = err.response?.data?.message || 'Login failed.'
      } finally {
        isLoading.value = false
      }
    }

    return { username, password, login, isLoading, error }
  },
}
</script>

<style>
  </style>
