<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="item in items" :key="item.id" class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-center mb-2">
          <img :src="item.item_url" alt="Item Image" class="w-16 h-18 rounded-full mr-4">
          <div>
            <h2 class="text-lg font-semibold">{{ item.item_name }}</h2>
            <p class="text-gray-600 text-sm mt-3">{{ item.details }}</p>
            <p class="text-green-600 text-sm mt-4">Price: Ksh. {{ item.price }}</p>
            
            <button 
              @click.prevent="addToCart(item)" 
              class="mt-0 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
       
          </div>
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
  