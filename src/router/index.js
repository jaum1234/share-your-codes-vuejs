import { createRouter, createWebHistory } from 'vue-router';
import { tokenParser } from '../mixins';

const routes = [
  {
    path: '/editordecodigo',
    name: 'CodeEditor',
    component: () => import('../views/EditorDeCodigo/EditorDeCodigo.vue')
  },
  {
    path: '/comunidade',
    name: 'Comunity',
    meta: {
      public : true
    },
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
    meta: {
      public : true
    },
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
    meta: {
      public : true
    },
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      public : true
    },
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

  const token = tokenParser.methods.parseAccessToken();

  if (!token && !to.meta.public) {
    next({name: 'Login'});
    return;
  }
  next();
})

export default router
