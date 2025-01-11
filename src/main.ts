import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono

import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/en-US'; // Cambia a tu idioma preferido
import quasarIconSet from 'quasar/icon-set/fontawesome-v5'; // Cambia a tu set de íconos preferido

import 'quasar/dist/quasar.css';
import type { routerKey } from 'vue-router';

library.add(faBars);
App.use(router)
createApp(App)
  .use(Quasar, {
    plugins: {}, // Plugins de Quasar si son necesarios
    lang: quasarLang,
    iconSet: quasarIconSet,
  })
  .component('font-awesome-icon', FontAwesomeIcon) // Registra FontAwesomeIcon
  .mount('#app');
