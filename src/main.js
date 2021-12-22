import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import Cookies from 'js-cookie';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/kimbie.dark.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCode, faUsers, faTrash, faSortDown, faBars, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faCode, faUsers, faTrash, faSortDown, faBars, faTimes, faEdit);

//import { httpRequest } from './domain/Http/Controllers/HttpController'

createApp(App).use(VueSweetalert2).use(router).use(VueHighlightJS).component('font-awesome-icon', FontAwesomeIcon).mount('#app');

//if (new Date().getTime() >= Cookies.get('token_expires_at')) {
//    httpRequest.refreshToken();
//}
