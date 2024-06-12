<template>
    <div v-for="n in 5" :key="n">
      <div v-if="items[n]" class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-center mb-2">
          <img :src="items[n].item_url" alt="Item Image" class="w-16 h-18 rounded-full mr-4">
          <div>
            <h2 class="text-lg font-semibold">{{ items[n].item_name }}</h2>
            <p class="text-gray-600 text-sm mt-3">{{ items[n].details }}</p>
            <p class="text-green-600 text-sm mt-4">Price: Ksh. {{ items[n].price }}</p>
            <button
              @click.prevent="addToCart(items[n])"
              class="mt-0 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <script>
      export default {
        props: {
          id: {
            type: Number,
            default: 1, // Set a default id if not provided
          },
        },
        data() {
          return {
            items: Array(5).fill(null),
          };
        },
        async mounted() {
          const apiUrls = [
            `https://your-api.com/api/items?id=4`,
            `https://your-api.com/api/items?id=5`,
            `https://your-api.com/api/items?id=7`,
            `https://your-api.com/api/items?id=3`,
            `https://your-api.com/api/items?id=12`,
          ];
          try {
            const responses = await Promise.all(apiUrls.map(axios.get));
            this.items.splice(0, 5, ...responses.map(response => response.data));
          } catch (error) {
            console.error('Error fetching items:', error);
            // Handle errors appropriately
          }
        },
        // ... rest of your code
      };
      </script>
    </div>
  </template>
  