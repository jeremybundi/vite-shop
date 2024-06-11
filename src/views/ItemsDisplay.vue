<template>
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div v-for="item in items" :key="item.id" class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex items-center mb-2">
        <img :src="item.item_url" alt="Item Image" class="w-16 h-16 rounded-full mr-4">
        <div>
          <h2 class="text-lg font-semibold">{{ item.item_name }}</h2>
          <p class="text-gray-600 text-sm mt-3">{{ item.details }}</p>
          <p class="text-green-600 text-sm mt-4">Price: Ksh. {{ item.price }}</p>
        </div>
      </div>
      
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        items: [],
        error: null,
      };
    },
    created() {
      axios.get('/api/items')
        .then(response => {
          this.items = response.data.data;
          console.log(response.data.data);
        })
        .catch(error => {
          this.error = error;
          console.log(error);
        });
    },
  };
  </script>
  