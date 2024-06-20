import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router'; 
import { createPinia } from 'pinia';


import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


library.add(fas); 

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.use(pinia)
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('font-awesome-layer-text', FontAwesomeLayersText) 

app.mount('#app');
