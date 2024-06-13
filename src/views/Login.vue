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
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Log In</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password,
        });

       
        console.log('Login successful:', response.data);
        // Redirect to dashboard or handle errors
      } catch (error) {
        console.error('Login failed:', error);
  
      }
    },
  },
};
</script>

<style>
  .login-container {
  
    background-image: url('https://shopzetu.com/cdn/shop/files/Party_Fits_Website_Banner_d12861bf-134d-4236-954c-7fed0778537e.jpg?v=1716370022&width=1920');
    
    background-size: cover;
    background-position: center;
    /* Add other styles for the container */
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
 

</style>

