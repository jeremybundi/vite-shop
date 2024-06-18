<template>
    <div class="flex flex-col p-4">
      <div class="flex ml-auto">
        <input v-model="name" type="text" placeholder="Search by name" 
        class="p-2 border rounded w-50"> 
        <button @click="searchUsers" class="ml-2 p-2 bg-green-900 text-white rounded">Search</button>
      </div>
      <table class="min-w-full w-3/4 table-fixed">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 text-left">User ID</th> 
            <th class="p-2 text-left">Name</th> 
            <th class="p-2 text-left w-1/6">Username</th>
            <th class="p-2 text-left w-1/6">Email</th> 
            <th class="p-2 text-left w-1/4">Role ID</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b text-xs">
              <td class="p-2">{{ user.id }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.username }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">
                <div v-if="editingUserId === user.id">
                  <select v-model="user.role_id" class="p-2 border rounded w-15">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                  <button @click="saveRole(user)" class="ml-2 p-2 bg-blue-500 text-white rounded">Save</button>
                </div>
                <div v-else>
                  {{ user.role_id }}
                  <button @click="editRole(user.id)" class="ml-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
                </div>
              </td>
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
        name: '',
        editingUserId: null,
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
      },
      editRole(userId) {
      this.editingUserId = userId;
      },
      async saveRole(user) {
        try {
          const url = `/api/roles/update/${user.id}/${user.role_id}`;
          await axios.put(url);
          this.editingUserId = null;
          this.fetchUsers();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
 