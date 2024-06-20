<template>
  <div class="flex items-center justify-center space-x-4">
    <button
      v-for="category in categories"
      :key="category.id"
      @mouseover="showDropdown(category.id)"
      @mouseleave="showDropdown(null)"
      class="px-4 py-2 rounded-md text-sm font_serif font-semibold text-gray-700 underline  
      hover:text-yellow-600 hover:underline-offset-8 focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {{ category.name }}
      <ul v-show="currentDropdownId === category.id" 
      class="absolute z-50 mt-2 rounded-md shadow-sm border border-gray-200 bg-white overflow-hidden">
        <li
          v-for="subcategory in category.subcategories"
          :key="subcategory.id"
          class="block px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
        > 
        

          <router-link :to="{ name: 'subcategories', params: { subcategoryId: subcategory.id } }">{{ subcategory.name }}</router-link>
        </li>
      </ul>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'MyDropdown',
  setup() {
    const router = useRouter();
    const categories = [
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
    ];
    const currentDropdownId = ref(null);

    const showDropdown = (id) => {
      currentDropdownId.value = id;
    };

    return { categories, currentDropdownId, showDropdown };
  },
};
</script>

<style scoped>
</style>
