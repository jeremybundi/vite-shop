<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
    <div v-for="id in specificIds" :key="id" class="bg-green-50 p-4 rounded-lg shadow-md">
      <div class="flex flex-col">
        <h2 class="text-lg text-center font-semibold mb-0 mt-1">{{ items[id].item_name }}</h2>
        <img :src="items[id].item_url" alt="Item Image" class="w-22 h-18 mx-auto">  
        <div>
          <p class="text-gray-600 text-sm mt-3 mr-2">{{ items[id].details }}</p>
          <p class="text-green-600 text-sm mt-4">Price: Ksh. {{ items[id].price }}</p>
          <button
            @click.prevent="addToCart(items[id])"
            class="mt-0 bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 self-center"
          >
            Add to Cart
          </button>
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
      specificIds: [4, 5, 7, 3, 10], 
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


     

  