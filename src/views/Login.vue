<template>
  <div class="login-container" style="background-image: url('https://i.pinimg.com/474x/ab/51/15/ab51159db0e51cdc23b82af1452a994e.jpg'); 
  background-repeat: no-repeat; background-size: cover;">
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-3xl text-center font-bold mb-4 mt-2">Login</h2>
        <form @submit.prevent="login" class="mt-3">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium">Username</label>
            <input v-model="username" type="text" id="username" class="mt-1 p-2 border rounded-md w-full" required>
            <div v-if="!isUsernameValid && username.length > 0" class="text-red-500 text-sm mt-2">
              Username must contain only alphanumeric characters, underscores, or hyphens.
            </div>
          </div>
          <div class="mb-4 relative">
            <label for="password" class="block text-sm font-medium">Password</label>
            <input v-model="password" 
            id="password" class="mt-1 p-2 border rounded-md w-full" required>
         
          </div>
          <div class="flex justify-center">
          <button type="submit" class="bg-green-700 text-white font-bold px-4 py-2 rounded-md w-1/3"
           :disabled="isLoading || !isUsernameValid">Log In</button>
          <div v-if="isLoading" class="text-center mt-2">
          </div>
          </div>
          <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
        </form>
       
        <div class="text-right mt-4">
          <a href="/signup" class="text-red-500 text-xs underline hover:underline">click here to sign up!!</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'
import { ref, computed } from 'vue'
import axios from 'axios'
import router from '../router'

export default {
  setup() {
    const userStore = useUserStore()
    const username = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const error = ref(null)
   

    const isUsernameValid = computed(() => /^[a-zA-Z0-9_-]+$/.test(username.value));

    
    const login = async () => {
      if (!isUsernameValid.value) {
        error.value = 'Username must contain only alphanumeric characters, underscores, or hyphens.';
        return;
      }

      isLoading.value = true
      error.value = null

      try {
        const response = await axios.post('/api/login', {
          username: username.value,
          password: password.value,
        });

        
        userStore.setUser(response.data.user_name, response.data.role_id)

        if (response.data.role_id == 1) {
          router.push({ path: '/admin' }); 
        } else if (response.data.role_id == 2) {
          router.push({ path: '/' }); 
        }
      } catch (err) {
        console.error('Login failed:', err);
        error.value = err.response?.data?.message || 'Login failed.'
      } finally {
        isLoading.value = false
      }
    }

    return { username, password, login, isLoading, error, isUsernameValid }
  },
}
</script>

<style scoped>

</style>
