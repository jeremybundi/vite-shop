<template>
  <div class="flex items-center min-h-screen p-6" 
  style="background-image: url('https://t4.ftcdn.net/jpg/06/91/05/19/240_F_691051962_GFhQPOAXABmf7l706q89b2PFh6FnB1kI.jpg'); background-repeat: no-repeat; background-size: cover;">
    <div class="w-full max-w-md mx-auto">
      <h1 class="text-2xl text-orange-50 font-bold text-center mb-6">Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4 flex items-center">
          <label for="name" class="block text-amber-50 font-bold mr-auto">Name</label>
          <input type="text" id="name" v-model="name" class="w-170 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.name }}</span>
        </div>
        <div class="mb-4 flex items-center">
          <label for="phone" class="block text-amber-50 font-bold mr-auto">Phone Number</label>
          <input type="tel" id="phone" v-model="phone" class="w-170 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.phone }}</span>
        </div>
        <div class="mb-4 flex items-center">
          <label for="email" class="block text-amber-50 font-bold mr-auto">Email</label>
          <input type="email" id="email" v-model="email" class="w-170 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.email }}</span>
        </div>
        <div class="mb-4 flex items-center">
          <label for="username" class="block text-amber-50 font-bold mr-auto">Username</label>
          <input type="username" id="username" v-model="username" class="w-120 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.username }}</span>
        </div>
        <div class="mb-4 flex items-center">
          <label for="password" class="block text-amber-50 font-bold mr-auto">Password</label>
          <input type="password" id="password" v-model="password" class="w-120 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.password }}</span>
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
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {}; 
      if (!this.name.match(/^[a-zA-Z ]+$/)) this.errors.name = 'The name must contain only letters.';
      if (!this.phone.match(/^\+?254\d{9}$/)) this.errors.phone = 'The phone number must be a valid Kenyan mobile number.';
      if (!this.email.match(/^\S+@\S+\.\S+$/)) this.errors.email = 'The email is not valid.';
      if (!this.username.match(/^[a-zA-Z0-9_-]+$/)) this.errors.username = 'The username must contain only alphanumeric characters, underscores, or hyphens.';
      if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) this.errors.password = 'The password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
      if (this.password !== this.confirmPassword) this.errors.confirmPassword = 'Passwords do not match.';

      return Object.keys(this.errors).length === 0; 
    },
    handleSubmit() {
      if (this.validateForm()) {
        axios.post('/api/users/register', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(response => {
          
          console.log('Signup successful!');
          this.clearForm();
        })
        .catch(error => {
         
          console.error('Signup failed:', error);
        });
      }
    },
    clearForm() {
      this.name = '';
      this.phone = '';
      this.email = '';
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
    }
  }
};
</script>

