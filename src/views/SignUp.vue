<template>
  <div class="flex items-center min-h-screen p-6" style="background-image: url('https://picsum.photos/536/354'); background-repeat: no-repeat; background-size: cover;">
    <div class="w-full max-w-md mx-auto">
      <h1 class="text-2xl text-orange-50 font-bold text-center mb-6">Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4 flex items-center">
          <label for="name" class="block text-amber-50 font-bold mr-auto">Name</label>
          <input type="text" id="name" v-model="name" class="w-170 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div class="mb-4 flex items-center">
          <label for="phone" class="block text-amber-50 font-bold mr-auto">Phone Number</label>
          <input type="tel" id="phone" v-model="phone" class="w-170 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div class="mb-4 flex items-center">
          <label for="email" class="block text-amber-50 font-bold mr-auto">Email</label>
          <input type="email" id="email" v-model="email" class="w-170 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div class="mb-4 flex items-center">
          <label for="username" class="block text-amber-50 font-bold mr-auto">Username</label>
          <input type="username" id="username" v-model="username" class="w-120 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div class="mb-4 flex items-center">
          <label for="password" class="block text-amber-50 font-bold mr-auto">Password</label>
          <input type="password" id="password" v-model="password" class="w-120 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div class="mb-6 flex items-center">
          <label for="confirmPassword" class="block text-amber-50 font-bold mr-auto">Confirm Pswd</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="w-120 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div class="flex justify-center">  <button type="submit" class="w-1/3 py-2 bg-lime-500 hover:bg-lime-700 text-white font-bold rounded-md">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: [],
    };
  },
  methods: {
    async handleSubmit() {
      this.errors = []; // Clear previous errors

      if (this.password !== this.confirmPassword) {
        this.errors.push('Passwords do not match');
        return;
      }

      try {
        const response = await axios.post('/api/users/register', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          username: this.username,
          password: this.password,
        });

        if (response.data.success) {
          
          console.log('Signup successful!');
        } else {
         
        }
      } catch (error) {
        console.error('Error submitting signup:', error);
  
      }
    },
  },
};
</script>

<style scoped>
</style>