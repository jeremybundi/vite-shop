<template>
    <div class="flex flex-col p-4">
      <div class="flex flex-row mb-4">
        <input v-model="name" type="text" placeholder="Search by username" 
        class="p-2 border rounded w-1/3"> 
        <button @click="searchUsers" class="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
      </div>
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2">ID</th> 
            <th class="p-2">Name</th> 
            <th class="p-2">Username</th>
            <th class="p-2">Email</th> 
            <th class="p-2">Role ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b">
            <td class="p-2">{{ user.id }}</td>
            <td class="p-2">{{ user.name }}</td>
            <td class="p-2">{{ user.username }}</td>
            <td class="p-2">{{ user.email }}</td>
            <td class="p-2">{{ user.role_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        name: ''
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/api/roles');
          this.users = response.data;
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      async searchUsers() {
        try {
          const response = await axios.get(`/api/roles/get/${this.name}`);
          this.users = response.data;
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
 