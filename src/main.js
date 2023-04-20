import { createApp } from 'vue';

import App from './App.vue';
import router from './routes.js';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

import './assets/main.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
