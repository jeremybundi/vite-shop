<template>
    <div>
      <h2>Your Cart Items</h2>
      <div v-for="cartItem in cart" :key="cartItem.id" class="bg-white p-4 rounded-lg shadow-md mb-4">
        <div class="flex items-center">
          <img :src="cartItem.item_url" alt="Item Image" class="w-16 h-16 rounded-full mr-4">
          <div>
            <h3 class="text-lg font-semibold">{{ cartItem.item_name }}</h3>
            <p class="text-gray-600 text-sm mt-1">{{ cartItem.details }}</p>
            <p class="text-green-600 text-sm mt-2">Price: Ksh. {{ cartItem.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '../stores/cart.js'; 
  
  export default {
    computed: {
      cart() {
        return useCartStore().cartItems;
      },
    },
  };
  </script>
  