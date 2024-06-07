import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        userRole: null,
        userName: null,
    }),
    actions: {
        setUserWithRolesAndName(userData) {
            this.user = userData;
            this.userRole = userData.role || null;
            this.userName = userData.name || null;
        },
        resetUser() {
            this.user = null;
            this.userRole = null;
            this.userName = null;
        },
    },
    getters: {
      
        isLoggedIn: state => state.user !== null,
        hasRole: state => role => state.userRole === role,
    },
});
