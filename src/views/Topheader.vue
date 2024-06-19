<template>
    <div>
    <div class="relative h-16  flex items-center
    bg-cover bg-center" style="background-image: url('https://th.bing.com/th/id/OIP.PnSZs4XgeXCCuIokWHEdNAHaAb')">

    <span class="text-white font-bold font-mono text-lg sm:text-xl  inset-x-0 text-center">Heltz Online</span>
    
    <i class="fas fa-user  mr-2 sm:mr-2 h-6 w-6 text-xl text-white font-black"></i>
      <div class="flex flex-col items-center mr-2 sm:mr-2">
    <span v-if="userStore.username" class="text-sm font-medium text-gray-800">Hi, {{ userStore.username }}</span>
    <RouterLink :to="{ name:'Login'}" v-if="!userStore.username" 
     class="mt-2 cursor-pointer  text-white py-2 px-4 rounded hover:bg-blue-700">Sign In</RouterLink>
    <button v-if="userStore.username" @click="signOut" 
    class="mt-2  text-red py-2 px-4 rounded hover:bg-red-700">Sign Out</button>

</div>
</div>
      <div class="bg-white h-50 flex justify-center items-center">
  <img src="../assets/logo.jpg" alt="Company Logo" class="ml-4 h-20 sm:h-10 md:h-18 lg:h-20 xl:h-22" />
  <form @submit.prevent="searchItems" class="search-form flex items-center ml-4">
  <input
    v-model="searchQuery"
    placeholder="Enter Item Name"
    class="search-input focus:outline-none focus:ring-2 focus:ring-neutral-700 
    focus:ring-opacity-50 rounded-md bg-green-50 px-1 py-1 w-110 ml-70 border border-gray-300 " 
  />
  <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
    {{ errorMessage }}
  </div>
  <button
    type="submit"
    variant="primary"
    class="search-button bg-green-800 text-white hover:bg-blue-700 py-2 px-4 rounded-md ml-5 mr-50 sm:py-1 sm:px-2 sm:text-sm sm:mr-0"
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
import { ref, reactive } from 'vue'; 
import DropdownMenu from '../views/DropdownMenu.vue';
import { useAddedItemStore } from '../stores/addedItemsStore';
import { useItemsStore } from '../stores/itemsStore';
import { useUserStore } from '../stores/userStore'; 
import { RouterLink, useRouter } from 'vue-router';

export default {
  components: {
    DropdownMenu, 
  },
  
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    
    function navigateToLogin() {
      console.log('Navigating to Login...');
      router.push({ name: 'Login' });
    }

    function signOut() {
      userStore.username = null; 
      router.push({ name: 'Home' }); 
    }

    return { userStore, navigateToLogin, signOut };
  },

  data() {
    return {
      searchQuery: '', 
      items: [],
      errorMessage: ''
    };
  },

  computed: {
    cartItemCount() {
      return useAddedItemStore().getTotalItems;
    },
  },

  watch: {
    searchQuery(newVal) {
      if (!/^[A-Za-z]*$/.test(newVal)) {
        this.errorMessage = 'Only letters are allowed.';
      } else {
        this.errorMessage = '';
      }
    }
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
    },
   
  },
};
</script>
