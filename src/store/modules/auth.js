import { authHttp } from "../../domain/Http/Controllers/AuthController";
import Cookies from "js-cookie";

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
    },
    SET_TOKEN(state, {token, expirationTime}) {
        state.token.access_token = token;
        state.token.token_expires_at = expirationTime;
    },
    UPDATE_USER(state, { newNickname, newName }) {
        state.user.nickname = newNickname;
        state.user.name = newName
    }
}

const getters = {
    userIsLogged: () => Boolean(JSON.parse(Cookies.get('vuex')).authModule.token.access_token),
    token: () => JSON.parse(Cookies.get('vuex')).authModule.token.access_token
}

const actions = {
    login({commit}, credencials) {
        console.log("credenciais dnv: ", credencials)
        return new Promise(resolve => {
            authHttp.login(credencials)
                .then(res => {
                    if (res.success) {
                        commit('SET_USER', {
                            token: res.data.token.access_token,
                            expirationTime: new Date(new Date().getTime() + 60*60*1000).getTime(),
                            userName: res.data.user.name,
                            userNick: res.data.user.nickname,
                            userId: res.data.user.id
                        });
                        //authHttp.setCookies(res);
                    }
                    resolve(res);
                    
                })
        })
    },

    logout({commit, state}) {
        authHttp.logout(state.token.access_token)
            .then(() => {
                commit('UNSET_USER')
            })
    },

    refreshToken({commit}, token) {
        return new Promise(resolve => {
            authHttp.refreshToken(token)
                .then(res => {
                    commit('SET_TOKEN', {
                        token: res.data.token.access_token,
                        expirationTime: new Date(new Date().getTime() + 60*60*1000).getTime()
                    })

                    resolve(res);
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
    
}