
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router'; 
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(router);
app.mount('#app');
