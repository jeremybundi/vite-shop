import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router'; 
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingCart);

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon); // Register the component globally

app.mount('#app');
