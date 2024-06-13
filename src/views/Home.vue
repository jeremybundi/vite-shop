<template>
     <div>
        <div>
    <Slider/>
</div>

<div class="mt-3 mb-3 font-serif font-bold text-center lg:text-lg">Top Categories</div> 
<div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
    <div v-for="id in specificIds" :key="id" class="bg-green-50 p-4 rounded-lg shadow-md">
      <div class="flex flex-col">
        <h2 class="text-lg text-center font-semibold mb-0 mt-1">{{ items[id].item_name }}</h2>
        <img :src="items[id].item_url" alt="Item Image" class="w-22 h-18 mx-auto">  
        <div>
          <p class="text-gray-600 text-xs mt-3 mr-2">{{ items[id].details }}</p>
          <p class="text-rose-600 text-sm mt-2">Price: Ksh. {{ items[id].price }}</p>
      
     <div class="flex justify-content-end items-center">
      <i class="fas fa-shopping-cart text-red-400 relative" style="font-size: 20px;"></i>
      <button
        @click.prevent="addToCart(items[id])"
        class="mt-0 bg-green-700 text-white py-1 px-2 ml-2 rounded-md shadow-md hover:bg-blue-700 self-center"
      >
    Add to Cart
  </button>
</div>
        
        </div>
      </div>
    </div>
  </div>
 </div>
</div>
</template>
<script>
import Slider from '../views/Slider.vue';
import TopCategories from '../views/TopCategories.vue';
import axios from 'axios';
import { useAddedItemStore } from '../stores/addedItemsStore';

export default{
    components: {
    Slider, 
    TopCategories,
    },
  data() {
    return {
      specificIds: [4, 10, 7, 3, 8], 
      items: {},
    };
  },
  created() {
    this.fetchItems();
  },

  
  methods: {
    async fetchItems() {
      const promises = this.specificIds.map(async (id) => {
        const response = await axios.get(`/api/items/id/${id}`);
        return response.data.item;
        console.log(response.data.item)
      });
      const fetchedItems = await Promise.all(promises);
      this.items = fetchedItems.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
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
      },
  },
  };
</script>