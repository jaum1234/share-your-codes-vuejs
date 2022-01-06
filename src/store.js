import Vuex from 'vuex';
import Vue from 'vue';

import { authHttp } from './domain/Http/Controllers/AuthController';
import { validator } from './domain/Service/Validator';

Vue.use(Vuex);


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

const actions = {
    login({commit}, credencials) {
        authHttp.login(credencials)
                .then((res) => {
                    if (res.success) {
                        commit('SET_USER', {
                            token: res.data.token.access_token,
                            expirationTime: new Date(new Date().getTime() + 60*60*1000).getTime(),
                            userNick: res.data.user.nickname,
                            userId: res.data.user.id
                        })
                        authHttp.setCookies(res);
    
                        this.$router.push({name: 'CodeEditor'});
                        this.$swal({
                            title: 'Recarregue a página para garantir que tudo funcione normalmente. :)',
                            icon: 'warning'
                        });
                        return;   

                    }
                    validator.validate(this.errors, res.data.erros);
                })
    }
}

const store =  new Vuex.Store({
    state,
    mutations,
    actions
});

export default store;