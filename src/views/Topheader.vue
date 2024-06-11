<template>
    <div>
    <div class="relative h-16  flex items-center
    bg-cover bg-center" style="background-image: url('https://th.bing.com/th/id/OIP.PnSZs4XgeXCCuIokWHEdNAHaAb')">

      <span class="text-white font-bold font-mono text-2xl absolute inset-x-0 text-center">Heltz Shopping Company</span>
       
      </div>
      <div class="bg-white h-50 flex justify-center items-center">
  <img src="../assets/logo.jpg" alt="Company Logo" class="ml-4 h-20 sm:h-10 md:h-18 lg:h-20 xl:h-22" />
  <form @submit.prevent="searchItems" class="search-form flex items-center ml-80">
    <input
      v-model="searchQuery"
      placeholder="Enter Item Name"
      class="search-input focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-opacity-50 rounded-md 
      bg-green-50 px-1 py-1 w-110 ml-70  border border-gray-300"
    />
    <button
      type="submit"
      variant="primary"
      class="search-button bg-green-800 text-white hover:bg-blue-700 py-2 px-4 rounded-md ml-5 mr-50 sm:py-1  sm:px-1"
    >
      Search Items
  </button>
  </form>
  <span class="cart-count bg-green-500 text-black px-2 py-1 rounded-full ml-10">{{ cartItemCount }}</span>

    

    
</div>

</div>
  </template>
  
  <script>
import axios from 'axios';


export default {
  data() {
    return {
      searchQuery: '',
      
    };
  },
  computed: {
   
  },
  
  methods: {
    searchItems() {
    
    },
    
    
  },
};
</script>