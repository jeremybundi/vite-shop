
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; 
import Login from '../views/Login.vue'; 
import SignUp from '../views/SignUp.vue';
import AddItems from '../views/AddItems.vue';
import Add from '../views/Add.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/additems', name: 'AddItems', component: AddItems },
  { path: '/add', name: 'Add', component: Add },

 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
