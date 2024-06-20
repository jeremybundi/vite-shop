<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
    <div v-for="item in items" :key="id" class="bg-purple-50 p-4 rounded-lg shadow-md">
      <div class="flex flex-col">
        <h2 class="text-lg text-center font-semibold mb-0 mt-1">{{ item.item_name }}</h2>
        <img :src="item.item_url" alt="Item Image" class="w-22 h-18 mx-auto">  
        <div>
          <p class="text-black font-semibold text-xs mt-3 mr-2">{{ item.details }}</p>
          <p class="text-rose-400 font-bold text-sm mt-4">Price: Ksh. {{ item.price }}</p>
          <div class="flex justify-content-end items-center">
              <i class="fas fa-shopping-cart text-pink-700 relative" style="font-size: 20px;"></i>
              <button
                @click.prevent="addToCart(item)"
                class="mt-0 bg-green-700 text-white py-1 px-2 ml-2 rounded-md shadow-md hover:bg-blue-700 self-center"
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
import axios from 'axios';
import { useAddedItemStore } from '../stores/addedItemsStore';



export default {
  data() {
    return {
      items: [], 
    };
  },

  computed: {
    cartItemsCount() {
      const store = useAddedItemStore();
      return store.addedItems.length;
    }
  },
  mounted() {
    this.fetchData();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const store = useAddedItemStore();
      store.addedItems = JSON.parse(savedCart); 
    }
  },
  
    methods: {
      async fetchData() {
      try {
        const response = await axios.get('api/items', this.formData)

        this.items = response.data.data;
        console.log('Fetched data:', this.items);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
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

}


  },
};
</script>


