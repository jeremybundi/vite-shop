<template>
    <div>
    <div class="relative h-16 bg-stone-950 flex items-center">
        <span class="text-white font-bold font-mono text-lg pl-4 underline">Come shop with us!!</span>
      <span class="text-white font-bold font-mono text-2xl absolute inset-x-0 text-center">Heltz Shopping Company</span>
       
      </div>
      <div class="bg-white h-50 flex items-center justify-center">
    <img src="../assets/logo.jpg" alt="Company Logo" class="ml-4 h-20" />
    <form @submit.prevent="searchItems" class="search-form flex items-center ml-4">
      <input
        v-model="searchQuery"
        placeholder="Enter Item Name"
        class="search-input focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-opacity-50 rounded-md bg-yellow-50 px-3 py-2 w-50 h-10"
      />
      <b-button
        type="submit"
        variant="primary"
        class="search-button bg-green-800 text-white hover:bg-blue-700 py-2 px-4 rounded-md ml-2"
      >
        Search Items
      </b-button>
    </form>
    
  </div>
    
  
</div>
  </template>
  
  <script>
  export default {
    name: 'TopHeader',
  };
  </script>
  