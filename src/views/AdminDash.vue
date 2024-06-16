<template>
    <div class="bg-cover bg-center h-screen relative overflow-hidden">
      <div class="flex flex-col items-center justify-center h-full space-y-4 sm:absolute sm:top-1/4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:flex-row sm:space-y-0 sm:space-x-14">
        <button @click="addItem" class="bg-green-500 text-white font-bold py-2 px-4 rounded">Add Items</button>
        <button @click="viewOrder" class="bg-green-500 text-white font-bold py-2 px-4 rounded">View Orders</button>
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
      }
    }
  }
  </script>
  
  <style scoped>
 
  .bg-cover {
    background-image: url('https://media.istockphoto.com/id/152509232/photo/interior-of-shopping-mall.jpg?s=612x612&w=0&k=20&c=CtO5tpEVW8_LB__qgFrM3czriG-fAIJZPDtkGlDxv8w=');
  }
  
  </style>
  