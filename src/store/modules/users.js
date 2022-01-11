import Cookies from "js-cookie";
import { userHttp } from "../../domain/Http/Controllers/UserController";

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
    token: () => JSON.parse(Cookies.get('vuex')).usersModule.token.access_token,
    user: () => JSON.parse(Cookies.get('vuex')).usersModule.user
}

const actions = {
    async update({ commit, getters, dispatch }, { id, data }) {
        if (userHttp.tokenExpired()) {
            await dispatch('authModule/refreshToken', null, { root: true })
        }

        return new Promise(resolve => {
            userHttp.update(id, data, getters.token)
                .then(res => {
                    if (res.success) {
                        commit('UPDATE_USER', {
                            newNickname: res.data.new_nickname,
                            newName: res.data.new_name
                        })
                    }
                    resolve(res)
                })
        })
    },
    async projects({ getters, dispatch }, { id, page, limit }) {
        if (userHttp.tokenExpired()) {
            await dispatch('authModule/refreshToken', null, { root: true })
        }
        return new Promise(resolve => {
            

            userHttp.projetos(id, page, limit, getters.token)
                .then(res => {
                    resolve(res);
                })
        })

    }
}

export default {
    namespaced: true,
    actions,
    getters,
    mutations, 
    state
}