import { createRouter, createWebHistory } from 'vue-router';

import EditorDeCodigo from '../views/EditorDeCodigo/EditorDeCodigo.vue';
import Comunidade from '../views/Comunidade/Comunidade.vue';
import Login from '../views/Login/Login.vue';
import MeusProjetos from '../views/MeusProjetos/MeusProjetos.vue';

const routes = [
  {
    path: '/editordecodigo',
    name: 'EditorDeCodigo',
    component: EditorDeCodigo
  },
  {
    path: '/comunidade',
    name: 'Comunidade',
    component: Comunidade
  },
  {
    path: '/meusprojetos',
    name: 'MeusProjetos',
    component: MeusProjetos,
  },
  {
    path: '/meuperfil',
    name: 'MeuPerfil', 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    component: Comunidade

  }
  //{
  //  path: '/about',
  //  name: 'About',
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router
