
import { defineStore } from 'pinia';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
  }),
  actions: {
    setItems(items) {
      this.items = items;
    },
  },
});
