<template>
    <div class="category-dropdown">
      <div v-for="category in categories" :key="category.id" class="category">
        <button @click="toggleSubcategories(category.id)" class=" w-30 bg-green-600 rounded-full  hover:bg-gray-200">
          {{ category.name }}
        </button>
        <ul v-if="activeCategory === category.id" class="subcategories flex">
          <li v-for="subcategory in category.subcategories" :key="subcategory.id">
            <router-link :to="{ name: 'sub', params: { subcategoryId: subcategory.id } }">
              {{ subcategory.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      categories: Array,
    },
    setup() {
      const activeCategory = ref(null);
  
      const toggleSubcategories = (categoryId) => {
        activeCategory.value = activeCategory.value === categoryId ? null : categoryId;
      };
  
      return {
        activeCategory,
        toggleSubcategories,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles here */
  </style>
  