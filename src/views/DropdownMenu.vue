<template>
    <div class="category-dropdown">
      <div v-for="category in categories" :key="category.id" class="category">
        <button
          type="button"
          @click="toggleSubcategories(category.id)"
          class="cat-btn text-center font-bold py-2 px-4 rounded-md bg-green-500 hover:bg-yellow-300 hover:text-red-500 transition-colors duration-300"
        >
          {{ category.name }}
        </button>
        <ul v-if="activeCategory === category.id" class="subcategories">
          <li v-for="subcategory in category.subcategories" :key="subcategory.id">
            <router-link :to="{ name: '/sub', params: { subcategoryId: subcategory.id } }">
              {{ subcategory.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { emit } from 'vue';
  
  export default {
    props: {
      categories: Array,
    },
    data() {
      return {
        activeCategory: null,
      };
    },
    methods: {
      toggleSubcategories(categoryId) {
        this.activeCategory = this.activeCategory === categoryId ? null : categoryId;
        emit('subcategoryClicked', categoryId);
      },
    },
  };
  </script>
  
  <style scoped>
  .category-dropdown {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin: 0 auto;
  }
  
  .cat-btn {
    /* Use Tailwind utilities for responsiveness */
    sm:w-full;  md: w-10 /* Adjust width based on screen size */
  }
  
  .subcategories {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #f0f2e7;
    padding: 10px;
    border: 1px solid #ccc;
    width: 150px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    list-style-type: none;
    color: #10d9cc;
    font-size: 15px;
    font-family: 'Times New Roman', Times, serif;
  }
  
  .category:hover .subcategories {
    display: block;
  }
  
  /* Remove media query for responsiveness, leverage Tailwind utilities instead */
  </style>
  