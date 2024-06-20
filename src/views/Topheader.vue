<template>
    <div>
    <div class="relative h-16  
    bg-cover bg-center" style="background-image: url('https://th.bing.com/th/id/OIP.PnSZs4XgeXCCuIokWHEdNAHaAb')">
    <div class="flex justify-between ">
    <div class="underline text-white font-bold mt-3"> Shop with us!!</div>
     <div>
    <span class="text-white font-bold font-serif  text-2xl  inset-x-0">Heltz Online Shopping</span>
  </div>
    <div class="flex justify-center">
    <i class="fas fa-user mr-0 h-6 w-6 text-xl text-white font-black"></i>
      <div class="flex flex-col">
    <span v-if="userStore.username" class="text-sm font-medium text-white font bold">Hi, {{ userStore.username }}</span>
    <RouterLink :to="{ name:'Login'}" v-if="!userStore.username" 
     class="mt-0cursor-pointer  text-white py-2 px-4 rounded font-bold">Sign In</RouterLink>
    <button v-if="userStore.username" @click="signOut" 
    class="mt-0  text-red py-2 px-4 rounded font-bold">Sign Out</button>
  </div>
</div>
</div>
</div>
      <div class="bg-green-50 h-50 flex justify-evenly">
        <div>
  <img src="../assets/logo.jpg" alt="Company Logo" class="ml-4 h-20 sm:h-10 md:h-18 lg:h-20 xl:h-22" />
</div>
<div>
  <form @submit.prevent="searchItems" class="search-form flex mt-6">
  <input
    v-model="searchQuery"
    placeholder="Enter Item Name"
    class="search-input focus:outline-none focus:ring-2 focus:ring-neutral-700 
    focus:ring-opacity-50 rounded-md bg-yellow-50 px-1 py-1 w-110 ml-70 border border-gray-300 " 
  />
  <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
    {{ errorMessage }}
  </div>
  <button
    type="submit"
    variant="primary"
    class="search-button bg-green-800 text-white hover:bg-blue-700 py-2 px-4
     rounded-md ml-5 mr-50 sm:py-1 sm:px-2 sm:text-sm sm:mr-0"
    >
    Search Items
  </button>
</form>
</div>
  <div>
    <router-link to="/checkout">
      <i class="fas fa-shopping-cart text-lime-900 relative mt-6" style="font-size: 35px;">
        <span class="cart-count absolute ml-1 top-0 right-0 text-right text-xs font-black  text-yellow-200 px-1 py-1 h-5 w-5 rounded-full">{{ cartItemCount }}</span>
      </i>
    </router-link>
  </div>
</div>
<div class="bg-green-50 flex justify-between">
<router-link :to="{path: '/'}" class="underline ml-10 text-sm font-bold hover:text-pink-500">Home</router-link>
<div  class="mb-2">
<DropdownMenu />
</div>
<router-link :to="{path: '/items'}" class="underline mr-10 text-sm font-bold hover:text-pink-500">All items</router-link>
<router-link v-if="userStore.role == 1"  :to="{path: '/admin'}"
 class="underline mr-10 text-sm font-bold hover:text-pink-500">Admin Dashboard</router-link>

</div>
     
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
      userStore.role = null;
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
