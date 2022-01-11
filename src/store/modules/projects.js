import { projectHttp } from '../../domain/Http/Controllers/ProjectController';

import users from './users';

const getters = {
    token: () => users.getters.token()
}

const actions = {
    async store({ getters, dispatch }, data) { 
        if (projectHttp.tokenExpired()) {
            await dispatch('authModule/refreshToken', null, { root: true })
        }
        return new Promise(resolve => {
            if (projectHttp.tokenExpired()) {
                dispatch('authModule/refreshToken', null, { root: true })
            }

            projectHttp.store(data, getters.token)
                .then(res => {
                    resolve(res);
                })
        })
    },

    async update({ getters, dispatch }, { id, data }) {
        if (projectHttp.tokenExpired()) {
            await dispatch('authModule/refreshToken', null, { root: true })
        }
        return new Promise(resolve => {
            projectHttp.update(id, data, getters.token)
                .then(res => {
                    resolve(res);
                })
        })
    },

    async destroy({ getters, dispatch }, id) {
        if (projectHttp.tokenExpired()) {
            await dispatch('authModule/refreshToken', null, { root: true })
        }
        return new Promise(resolve => {
            projectHttp.delete(id, getters.token)
                .then(res => {
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