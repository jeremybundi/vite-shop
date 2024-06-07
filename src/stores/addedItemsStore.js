import { defineStore } from 'pinia';

export const useAddedItemStore = defineStore('addedItems', {
  state: () => {

    const savedCart = localStorage.getItem('cart');
    return {
      addedItems: savedCart ? JSON.parse(savedCart) : [],
    };
  },
  actions: {
    addItem(item) {
      const existingItem = this.addedItems.find(existing => existing.id === item.id);
      if (existingItem) {
        console.warn('Item already added to the cart:', item.id);
      } else {
        this.addedItems.push({ ...item, quantity: 1 });
        this.saveCart();
      }
    },
    removeItem(itemId) {
      const foundItemIndex = this.addedItems.findIndex(item => item.id === itemId);
      if (foundItemIndex !== -1) {
        this.addedItems.splice(foundItemIndex, 1);
        this.saveCart();
      }
    },
    increaseItemQuantity(itemId) {
      const foundItemIndex = this.addedItems.findIndex(item => item.id === itemId);
      if (foundItemIndex !== -1) {
        this.addedItems[foundItemIndex].quantity++;
        this.saveCart();
      }
    },
    decreaseItemQuantity(itemId) {
      const foundItemIndex = this.addedItems.findIndex(item => item.id === itemId);
      if (foundItemIndex !== -1) {
        const newQuantity = Math.max(0, this.addedItems[foundItemIndex].quantity - 1);
        this.addedItems[foundItemIndex].quantity = newQuantity;
        this.saveCart();
      }
    },
    clearCart() {
      this.addedItems = [];
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.addedItems));
    }
  },
  getters: {
    getTotalItems(state) {
      return state.addedItems.length;
    },
    getTotalPrice(state) {
      return state.addedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
});
