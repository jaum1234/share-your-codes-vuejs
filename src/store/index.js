import { createStore } from 'vuex'

import auth from './modules/auth';
import projects from './modules/projects';
import users from './modules/users';

import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

const vuexLocal = new VuexPersistence({
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value),
    removeItem: key => Cookies.remove(key) 
  }
})

export const store = createStore({
  modules: {
    authModule: auth,
    projectsModule: projects,
    usersModule: users
  },
  plugins: [vuexLocal.plugin]
})


