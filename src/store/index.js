import { createStore } from 'vuex'

import { authHttp } from '../domain/Http/Controllers/AuthController';


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
  SET_USER (state, {token, expirationTime, userNick, userId}) {
      state.token.access_token = token;
      state.token.token_expires_at = expirationTime;
      state.user.nickname = userNick;
      state.user.id = userId
  }
}

const getters = {
  userIsLogged: state => Boolean(state.token.access_token)
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
                authHttp.setCookies(res);
            }
            resolve(res);
            
        })
    }) 

    
  }
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store;
