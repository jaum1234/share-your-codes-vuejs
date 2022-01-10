import { projectHttp } from '../../domain/Http/Controllers/ProjectController';

import users from './users';

const getters = {
    token: () => users.getters.token()
}

const actions = {
    store({ getters }, data) { 
        return new Promise(resolve => {
            projectHttp.store(data, getters.token)
                .then(res => {
                    resolve(res);
                })
        })
    },

    

    update({ getters }, { id, data }) {
        return new Promise(resolve => {
            
            projectHttp.update(id, data, getters.token)
                .then(res => {
                    resolve(res);
                })
        })
    },

    destroy({ getters }, id) {
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