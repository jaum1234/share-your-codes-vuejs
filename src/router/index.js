import { createRouter, createWebHistory } from 'vue-router';

//import Comunidade from '../views/Comunidade/Comunidade.vue';
//import Login from '../views/Login/Login.vue';
//import EditorDeCodigo from '../views/EditorDeCodigo/EditorDeCodigo.vue';
//import MeusProjetos from '../views/MeusProjetos/MeusProjetos.vue';

const routes = [
  {
    path: '/editordecodigo',
    name: 'EditorDeCodigo',
    component: () => import('../views/EditorDeCodigo/EditorDeCodigo.vue')
  },
  {
    path: '/comunidade',
    name: 'Comunidade',
    component: () => import('../views/Comunidade/Comunidade.vue')
  },
  {
    path: '/meusprojetos',
    name: 'MeusProjetos',
    component: () => import('../views/MeusProjetos/MeusProjetos.vue')
  },
  {
    path: '/meuperfil',
    name: 'MeuPerfil',
    component: () => import('../views/MyProfile/MyProfile.vue') 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'Comunidade'}
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
