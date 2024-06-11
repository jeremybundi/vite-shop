
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; 
import Login from '../views/Login.vue'; 
import SignUp from '../views/SignUp.vue';
import Add from '../views/Add.vue';
import Topheader from '../views/Topheader.vue'
import ItemsDisplay from '../views/ItemsDisplay.vue';
import Checkout from '../views/Checkout.vue';
import  SearchedItems from '../views/SearchedItems.vue';
import OrderedItems from '../views/OrderedItems.vue';



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  {path: '/items', name: 'ItemsDisplay', component: ItemsDisplay},
  { path: '/add', name: 'Add', component: Add }, 
  { path: '/top', name: 'Topheader', component: Topheader },
  {path: '/checkout', name: 'Checkout', component: Checkout},
  {path: '/search', name: 'Search', component: SearchedItems},
  {path: '/ordered', name: 'OrderedItems', component: OrderedItems},

 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
