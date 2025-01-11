import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router.js'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono

import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/en-US'; // Cambia a tu idioma preferido
import quasarIconSet from 'quasar/icon-set/fontawesome-v5'; // Cambia a tu set de íconos preferido

import 'quasar/dist/quasar.css';
import type { routerKey } from 'vue-router';

library.add(faBars);

const app = createApp(App); 
app.use(router);

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
  iconSet: quasarIconSet,
});

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
