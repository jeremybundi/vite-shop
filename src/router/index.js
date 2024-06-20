import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore'; 

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Add from '../views/Add.vue';
import Topheader from '../views/Topheader.vue';
import ItemsDisplay from '../views/ItemsDisplay.vue';
import Checkout from '../views/Checkout.vue';
import SearchedItems from '../views/SearchedItems.vue';
import OrderedItems from '../views/OrderedItems.vue';
import SubCategories from '../views/SubCategories.vue';
import TopCategories from '../views/TopCategories.vue';
import AdminDash from '../views/AdminDash.vue';
import Roles from '../views/Roles.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/items',
    name: 'ItemsDisplay',
    component: ItemsDisplay,
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    //meta: { requiresAuth: true, role: 1 },
   
  },
  {
    path: '/top',
    name: 'Topheader',
    component: Topheader,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true, role: 2 }, 

  },
  {
    path: '/search',
    name: 'Search',
    component: SearchedItems,
  },
  {
    path: '/ordered',
    name: 'OrderedItems',
    component: OrderedItems,
    meta: { requiresAuth: true, role: 1 },
    
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Roles,
   // meta: { requiresAuth: true, role: 1 },
    
  },
  {
    path: '/sub/:subcategoryId',
    name: 'subcategories',
    component: SubCategories,
  },
  {
    path: '/topcategories',
    name: 'TopCategories',
    component: TopCategories,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDash,
    meta: { requiresAuth: true, role: 1 },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  console.log('Current user role:', userStore.role); 
  console.log('Required role for route:', to.meta.role); 

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (userStore.role == to.meta.role) {
      next(); 
    } else {
      console.log('Redirecting to login: User role does not match required role');
      next({ path: '/login' }); 
    }
  } else {
    next(); 
  }
});


export default router;
