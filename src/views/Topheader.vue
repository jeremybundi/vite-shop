<template>
    <div>
    <div class="relative h-16  flex items-center
    bg-cover bg-center" style="background-image: url('https://th.bing.com/th/id/OIP.PnSZs4XgeXCCuIokWHEdNAHaAb')">
    <span class="text-white font-bold font-mono text-lg sm:text-2xl absolute inset-x-0 text-center">Heltz Shopping Company</span>
    <i class="fas fa-user ml-auto mr-2 sm:mr-5 h-8 w-8 text-2xl text-white font-black"></i>
    <span class="text-white font-semibold ml-2 sm:ml-5 mr-2 sm:mr-2">Hi, {{ userStore.username }}</span>
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
   
  <div>
    <router-link to="/checkout">
      <i class="fas fa-shopping-cart text-lime-900 relative ml-20 sm:ml-5" style="font-size: 35px;">
        <span class="cart-count absolute ml-1 top-0 right-0 text-right text-xs font-black  text-yellow-300 px-1 py-1 h-5 w-5 rounded-full">{{ cartItemCount }}</span>
      </i>
    </router-link>
  </div>
</div>
<DropdownMenu />
     
</div>
  </template>
  
  <script>
import axios from 'axios';
import { ref } from 'vue'; 
import DropdownMenu from '../views/DropdownMenu.vue';
import { useAddedItemStore } from '../stores/addedItemsStore';
import { useItemsStore } from '../stores/itemsStore';
import { useUserStore } from '../stores/userStore' // Adjust path as needed



export default {
  
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  components: {
    DropdownMenu, 
  },
  
  data() {
    return {
      searchQuery: '', 
      items: [],
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