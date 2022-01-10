import { authHttp } from "../../domain/Http/Controllers/AuthController";

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
                            expirationTime: new Date(new Date().getTime() + 60*60*1000).getTime(),
                            userName: res.data.user.name,
                            userNick: res.data.user.nickname,
                            userId: res.data.user.id
                        }, { root: true });
                    }
                    resolve(res);
                    
                })
        })
    },

    logout({ commit, getters }) {
        authHttp.logout(getters.token)
            .then(() => {
                commit('usersModule/UNSET_USER', {}, { root: true })
            })
    },

    refreshToken({ commit, getters }) {
        return new Promise(resolve => {
            authHttp.refreshToken(getters.token)
                .then(res => {
                    commit('usersModule/SET_TOKEN', {
                        token: res.data.token.access_token,
                        expirationTime: new Date(new Date().getTime() + 60*60*1000).getTime()
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