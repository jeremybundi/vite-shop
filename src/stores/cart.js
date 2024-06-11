// cart.js (Pinia store)
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // Array to store cart items
  }),
  getters: {
    cartLength() {
      return this.items.length; // Computed property for cart length
    },
  },
  actions: {
    addItem(item) {
      this.items.push(item); // Add item to cart
    },
    // Other actions (e.g., removeItem, clearCart) as needed
  },
});
