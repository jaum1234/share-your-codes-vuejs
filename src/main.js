import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/kimbie.dark.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCode, faUsers, faTrash, faSortDown, faBars, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faCode, faUsers, faTrash, faSortDown, faBars, faTimes, faEdit, faWhatsapp, faTwitter);

createApp(App)
    .use(store)
    .use(VueSweetalert2)
    .use(router)
    .use(VueHighlightJS)
    .component('font-awesome-icon', FontAwesomeIcon).mount('#app');

