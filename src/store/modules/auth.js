import { authHttp } from "../../domain/Http/Controllers/AuthController";
import { httpRequest } from "../../domain/Http/Controllers/HttpController";

import users from "./users";

const getters = {
    token: () => users.getters.token()
}

const actions = {
    login({ commit }, credencials) {
        return new Promise(resolve => {
            authHttp.login(credencials)
                .then(res => {
                    if (res.success) {
                        commit('usersModule/SET_USER', {
                            token: res.data.token.access_token,
                            expirationTime: new Date(new Date().getTime() + res.data.token.expires_in*60*1000).getTime(),
                            userName: res.data.user.name,
                            userNick: res.data.user.nickname,
                            userId: res.data.user.id
                        }, { root: true });
                    }
                    resolve(res);
                    
                })
        })
    },

    async logout({ commit, getters, dispatch }) {
            if (authHttp.tokenExpired()) {
                await dispatch('authModule/refreshToken', null, { root: true })
            }
    
            authHttp.logout(getters.token)
                .then(() => {
                    commit('usersModule/UNSET_USER', null, { root: true })
                })

       
    },

    refreshToken({ commit, getters }) {
        return new Promise(resolve => {
            httpRequest.refreshToken(getters.token)
                .then(res => {
                    commit('usersModule/SET_TOKEN', {
                        token: res.data.token.access_token,
                        expirationTime: new Date(new Date().getTime() + res.data.token.expires_in*60*1000).getTime()
                    }, { root: true })

                    resolve(res);
                })
        })
    }
}

export default {
    namespaced: true,
    actions,
    getters
}