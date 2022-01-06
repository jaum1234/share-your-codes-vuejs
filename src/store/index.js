import { createStore } from 'vuex'
import { authHttp } from '../domain/Http/Controllers/AuthController';

import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

const vuexLocal = new VuexPersistence({
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value),
    removeItem: key => Cookies.remove(key) 
  }
})

const state = {
  token: {
      access_token: '',
      token_expires_at: ''
  },
  user: {
      id: null,
      nickname: '',
  }
}

const mutations = {
  SET_USER (state, {token, expirationTime, userNick, userId, userName}) {
      state.token.access_token = token;
      state.token.token_expires_at = expirationTime;
      state.user.nickname = userNick;
      state.user.name = userName
      state.user.id = userId
  },
  UNSET_USER(state) {
    state.token = {},
    state.user = {}
  }
}

const getters = {
  userIsLogged: () => Boolean(JSON.parse(Cookies.get('vuex')).token.access_token)
}

const actions = {
  login({commit}, credencials) {
    return new Promise(resolve => {
      authHttp.login(credencials)
        .then(res => {
            if (res.success) {
                commit('SET_USER', {
                    token: res.data.token.access_token,
                    expirationTime: new Date(new Date().getTime() + 60*60*1000).getTime(),
                    userNick: res.data.user.nickname,
                    userId: res.data.user.id
                });
                //authHttp.setCookies(res);
            }
            resolve(res);
            
        })
    })
  },
  logout({commit}) {
    authHttp.logout()
      .then(() => {
        commit('UNSET_USER')
      })
  }
}

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin]
})

export default store;
