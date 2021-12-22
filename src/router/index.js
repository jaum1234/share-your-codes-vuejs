import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

//import Comunidade from '../views/Comunidade/Comunidade.vue';
//import Login from '../views/Login/Login.vue';
//import EditorDeCodigo from '../views/EditorDeCodigo/EditorDeCodigo.vue';
//import MeusProjetos from '../views/MeusProjetos/MeusProjetos.vue';

const routes = [
  {
    path: '/editordecodigo',
    name: 'CodeEditor',
    component: () => import('../views/EditorDeCodigo/EditorDeCodigo.vue')
  },
  {
    path: '/comunidade',
    name: 'Comunity',
    component: () => import('../views/Comunidade/Comunidade.vue')
  },
  {
    path: '/meusprojetos',
    name: 'MyProjects',
    component: () => import('../views/MeusProjetos/MeusProjetos.vue')
  },
  {
    path: '/meuperfil',
    name: 'MyProfile',
    component: () => import('../views/MyProfile/MyProfile.vue') 
  },
  {
    path: '/projeto/:id',
    name: 'ProjectPage',
    component: () => import('../views/ProjectPage/ProjectPage.vue')
  },
  {
    path: '/editordecodigo/:id',
    name: 'EditCode',
    component: () => import('../views/EditorDeCodigo/EditorDeCodigo.vue')
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
    redirect: { name: 'Comunity' }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  if(!Cookies.get('_myapp_token') && (to.name == 'MeusProjetos' || to.name == 'MeuPerfil' || to.name == 'CodeEditor')) {
    next({name: 'Login'});
    return;
  }
  next();
})

export default router
