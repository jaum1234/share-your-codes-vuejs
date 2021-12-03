<template>
    <div class="container--small">
        <div class="login">
            <div class="link--home">
                <router-link :to="{name: 'Comunidade'}" class="link">Home</router-link>
            </div>
            <h1 class="login__title">Login</h1>
            <form @submit.prevent="login">
                <div v-for="field in fields" :key="field" class="field" :class="field.class">
                    <div class="login__label"><label>{{ field.name }}</label></div>
                    <Input textAlign="center" @value="field.inputGetter" :tipo="field.inputType"/>
                    <small style="color: red"></small>
                </div>
                <div class="login__botao">
                    <Botao type="submit" label="Fazer login" background="#5081FB"/>
                </div>
                <router-link :to="{name: 'Register'}">Ainda nao pussuo cadastro</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import Input from '../../components/shared/Form/Input.vue';
//import AuthRequest from '../../domain/Http/AuthRequest';
import Botao from '../../components/shared/Botao/Botao.vue';
import { authHttp } from '../../domain/Http/AuthRequest.js';
//import Cookies from 'js-cookie';

export default {
    components: {
        Input,
        Botao
    },
    data() {
        return {
            fields: [
                {
                    name: 'E-mail', 
                    class: 'login__email', 
                    inputGetter: this.getEmail, 
                    inputType: 'email'
                },
                {
                    name: 'Senha', 
                    class: 'login__password', 
                    inputGetter: this.getPassword, 
                    inputType: 'password'
                },
            ],
            form: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: '' 
            }
        }
    },
    methods: {
        getEmail(email) {
            this.form.email = email;
        },
        getPassword(password) {
            this.form.password = password;
        },

        login() {
            authHttp.login(this.form);
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 2rem;
    margin-bottom: 3.5rem;
}

.login__label {
    margin-bottom: 1rem;
}

.login {
    margin-top: 7rem;
}

.link--home {
    margin-bottom: 2rem;
}

.link {
    color: white;
}

.field {
    margin-bottom: 1rem;
}

.login__botao {
    margin: 0 auto 2rem auto;
    width: 50%;
}
</style>