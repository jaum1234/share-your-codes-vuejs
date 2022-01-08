import Cookies from "js-cookie";
import { userHttp } from "../../domain/Http/Controllers/UserController";

import auth from "./auth";

const getters = {
    user: () => JSON.parse(Cookies.get('vuex')).authModule.user
}

const actions = {
    update({ commit }, {id, data}) {
        return new Promise(resolve => {
            userHttp.update(id, data, auth.getters.token())
                .then(res => {
                    console.log(res)
                    if (res.success) {
                        commit('authModule/UPDATE_USER', {
                            newNickname: res.data.new_nickname,
                            newName: res.data.new_name
                        }, { root: true })
                    }
                    resolve(res)
                })
        })
    },
    projects({state}, {id, page, limit}) {
        console.log("ID: ", id)
        return new Promise(resolve => {
            console.log(state)
            userHttp.projetos(id, page, limit, auth.getters.token())
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
}