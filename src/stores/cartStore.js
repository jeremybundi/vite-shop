import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // Array to store cart items
  }),
  actions: {
    addToCart(item) {
      this.items.push(item); // Add the item to the cart
    },
  },
  getters: {
    getCartItems() {
      return this.items; // Getter to access cart items
    },
  },
});
