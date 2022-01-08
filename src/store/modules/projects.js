import { projectHttp } from '../../domain/Http/Controllers/ProjectController';

import auth from './auth';



//const state = {
//    token: auth.getters.token()
//}


const actions = {
    store({ state }, data) {
        console.log(state.token)
        
        return new Promise(resolve => {
            projectHttp.store(data, auth.getters.token())
                .then(res => {
                    resolve(res);
                })
        })
    },

    update(data) {
        return new Promise(resolve => {
            projectHttp.update(data, auth.getters.token())
                .then(res => {
                    resolve(res);
                })
        })
    }
}

export default {
    namespaced: true,
    actions,
    //state
}