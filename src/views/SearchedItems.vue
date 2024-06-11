<template>
    <div class="my-component">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="item in items" :key="item.id" class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ item.item_name }}</h2>
          <img :src="item.item_url" alt="Item Image" class="w-full h-48 object-cover mt-4" />
  
          <p class="text-sm text-gray-600">{{ item.details }}</p>
          <p class="text-red-500 font-semibold mt-2">Price Ksh. {{ item.price }}</p>
  
          <div class="flex items-center mt-4">
            <i class="fas fa-shopping-cart text-pink-500 mr-2"></i>
            <button @click="addToCart(item)" class="bg-green-500 text-white px-2 py-1 rounded-md text-xs">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAddedItemStore } from '../stores/addedItemsStore';
  import { useItemsStore } from '../stores/itemsStore';
  
  export default {
    computed: {
      items() {
        return useItemsStore().items;
      },
    },
    methods: {
      addToCart(item) {
        const store = useAddedItemStore();
        const existingItem = store.addedItems.find(existing => existing.id === item.id);
        if (existingItem) {
          alert('Item already exists in the cart');
        } else {
          store.addedItems.push({ ...item, quantity: 1 });
        }
  
        localStorage.setItem('cart', JSON.stringify(store.addedItems));
  
        this.$emit('cart-updated');
      },
    },
  };
  </script>
  
  <style scoped>
  .my-component {
    font-family: 'Times New Roman', Times, serif;
    background-image: url('https://i.pinimg.com/474x/2f/f3/05/2ff3059a3f2b6bd1669dd8169ba61a7e.jpg');
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    .grid-cols-1 {
      grid-template-columns: 1fr;
    }
  }
  </style>
  