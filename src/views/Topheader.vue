<template>
    <div>
    <div class="relative h-16  flex items-center
    bg-cover bg-center" style="background-image: url('https://th.bing.com/th/id/OIP.PnSZs4XgeXCCuIokWHEdNAHaAb')">

      <span class="text-white font-bold font-mono text-2xl absolute inset-x-0 text-center">Heltz Shopping Company</span>
       
      </div>
      <div class="bg-white h-50 flex justify-center items-center">
  <img src="../assets/logo.jpg" alt="Company Logo" class="ml-4 h-20 sm:h-10 md:h-18 lg:h-20 xl:h-22" />
  <form @submit.prevent="searchItems" class="search-form flex items-center ml-4">
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
  <i class="fas fa-shopping-cart text-orange-500 mr-8 h-8 w-8 ml-10"></i> 

  <span class="cart-count bg-green-500 text-black px-2 h-7 w-10 py-1 rounded-full ">{{ cartItemCount }}</span>
  
    
</div>
<DropdownMenu :categories="categories" style="margin-top:0;" />
     
</div>
  </template>
  
  <script>
import axios from 'axios';
import DropdownMenu from '../views/DropdownMenu.vue';
import { useAddedItemStore } from '../stores/addedItemsStore';
import { useItemsStore } from '../stores/itemsStore';


export default {
  components: {
    DropdownMenu, 
  },
  
  data() {
    return {
      searchQuery: '', 
      items: [],
      categories: [
        {
          id: 1,
          name: "Men's Wear",
          subcategories: [
            { id: 1, name: 'Men T-shirts' },
            { id: 2, name: 'Men Trouser' },
            { id: 3, name: 'Men Suits' },
            { id: 4, name: 'Men Shirts' },
            { id: 5, name: 'Men Shoes' },
            
            
          ],
        },
        {
          id: 2,
          name: 'Ladies Wear',
          subcategories: [
            { id: 6, name: 'Ladies Dresses' },
            { id: 7, name: 'Ladies Heels' },
            { id: 8, name: 'Ladies Sweater' },
            { id: 9, name: 'Ladies Tops' },
            { id: 10, name: 'Ladies Crop Shirts' },
          ],
        },
        {
        id: 3,
          name: "Kids' Wear",
          subcategories: [
            { id: 11, name: 'Kids Tops' },
            { id: 12, name: 'Kids Bottoms' },
            { id: 13, name: 'Kids Dresses' },
            { id: 14, name: 'Kids Outwears' },

          ],
        },
      ],
    };
  },
  computed: {
    cartItemCount() {
      return useAddedItemStore().getTotalItems;
    },
  },
  methods: {
    async searchItems() {
      try {
        const response = await axios.get(`/api/search/${this.searchQuery}`);
        const items = response.data.items;
        useItemsStore().setItems(items);

        if (this.$route.path !== '/search') {
          this.$router.push('/search');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    
  },
};
</script>