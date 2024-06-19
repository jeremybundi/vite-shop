<template>
    <div class="login-container"
     style="background-image: url('https://i.pinimg.com/474x/ab/51/15/ab51159db0e51cdc23b82af1452a994e.jpg'); background-size: cover; background-repeat: no-repeat;">
    <div class="flex  min-h-screen p-6">
    <div class="w-full max-w-md mx-auto mt-2 bg-white rounded-md border mb-2" >
      <h1 class="text-2xl text-black font-bold text-center mb-6">Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <div  class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="name" class="text-center block text-black font-bold">Name</label>
          <input type="text" id="name" v-model="name" class="w-25 mx-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.name }}</span>
        </div>
        <div>
          <label for="phone" class="text-center block text-black font-bold">Phone Number</label>
          <input type="tel" id="phone" v-model="phone" class="w-25 mx-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.phone }}</span>
        </div>
        <div>
          <label for="email" class=" text-center block text-black font-bold">Email</label>
          <input type="email" id="email" v-model="email" class="w-25 mx-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.email }}</span>
        </div>
        <div>
          <label for="username" class="text-center block text-black font-bold">Username</label>
          <input type="username" id="username" v-model="username" class="w-25 mx-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.username }}</span>
        </div>
        <div>
          <label for="password" class="text-center block text-black font-bold">Password</label>
          <input type="password" id="password" v-model="password" class="w-25 mx-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span class="text-red-500 text-xs">{{ errors.password }}</span>
        </div>
        <div>
          <label for="confirmPassword" class="text-center block text-black font-bold">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="w-25 mx-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
      </div>
        <div class=" text-center bt-3">
        <button type="submit" class=" w-1/2 py-2 bg-lime-500 hover:bg-lime-700 
        text-white font-bold rounded-md ">Sign Up</button>
      </div>
        <div v-if="signupSuccess" class="text-center text-yellow-200 col-span-2">
          Signup successful! Please log in to continue. <a href="/login" class="text-red-500">Login</a>
        </div>
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
      name: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {},
      signupSuccess: false,
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
          this.signupSuccess = true;
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

