import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/kimbie.dark.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCode, faUsers, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faCode, faUsers, faTrash);

createApp(App).use(VueSweetalert2).use(router).use(VueHighlightJS).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
