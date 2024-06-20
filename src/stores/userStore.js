import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
    role: null
  }),
  actions: {
    setUser(user_name, role_id) {
      this.username = user_name
      this.role = role_id
    },
    clearUser() {
      this.username = null
      this.role = null
    }
  },
  persist: false
})
