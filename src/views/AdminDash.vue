<template>
    <div class="bg-cover bg-center h-screen relative overflow-hidden ">
      <div class="flex flex-col items-center justify-center h-full space-y-4 sm:absolute sm:top-1/4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:flex-row sm:space-y-0 sm:space-x-14">
        <button @click="addItem" class="bg-lime-800 text-white font-bold py-2 px-4 rounded">Add Items</button>
        <button @click="viewOrder" class="bg-lime-800 text-white font-bold py-2 px-4 rounded">View Orders</button>
        <button @click="updateRoles" class="bg-lime-800 text-white font-bold py-2 px-4 rounded">Update User Roles</button>

      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'BackgroundImageComponent',
    methods: {
      addItem() {
        this.$router.push('/add');
      },
      viewOrder() {
        this.$router.push('/ordered');
      },
      updateRoles() {
        this.$router.push('/roles');
      }
    }
  }
  </script>
  
  <style scoped>
 
  .bg-cover {
    background-image: url('https://shopzetu.com/cdn/shop/files/Kakiba_Website_Banner.jpg?v=1717413611&width=1920');
  }
  
  </style>
  