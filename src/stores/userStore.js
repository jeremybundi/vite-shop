import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => ({
  role: null,
  username: null,
}), {
  actions: {
    updateUserInfo(role) {
      this.role = role;
      this.fetchUsername(role); 
    },
  },
  getters: {
    getRole() {
      return this.role;
    },
    getUsername() {
      return this.username;
    },
  },
});
