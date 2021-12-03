<template>
    <div class="container--small">
        <div class="register">
            <div class="link--home">
                <router-link :to="{name: 'Comunidade'}" class="link">Home</router-link>
            </div>
            <h1 class="register__title">Cadastro</h1>
            <form @submit.prevent="register">
                <div v-for="field in fields" :key="field" class="field" :class="field.class">
                    <div class="register__label"><label>{{ field.name }}</label></div>
                    <Input textAlign="center" @value="field.inputGetter" :tipo="field.inputType"/>
                    <small style="color: red"></small>
                </div>
                <div class="register__botao">
                    <Botao type="submit" label="Finalizar Cadastro" background="#5081FB"/>
                </div>
                <router-link :to="{name: 'Login'}">Já possuo cadastro</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import Input from '../../components/shared/Form/Input.vue';
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
                    class: 'register__email', 
                    inputGetter: this.getEmail, 
                    inputType: 'email'
                },
                {
                    name: 'Nickname', 
                    class: 'register__nickname', 
                    inputGetter: this.getNickname, 
                    inputType: 'text'
                },
                {
                    name: 'Senha', 
                    class: 'register__password', 
                    inputGetter: this.getPassword, 
                    inputType: 'password'
                    },
                {
                    name: 'Confirmar senha', 
                    class: 'register__confirm-password', 
                    inputGetter: this.getConfirmPassword, 
                    inputType: 'passowrd'
                }
            ],
            form: {
                email: '',
                password: '',
                nickname: ''
            },
            errors: {
                email: '',
                password: '' ,
                nickname: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        getEmail(email) {
            console.log("Email: " + email)
            this.form.email = email;
        },
        getNickname(nickname) {
            console.log("Nickname: " + nickname)
            this.form.nickname = nickname;
        },
        getConfirmPassword(confirmPassword) {
            console.log("Confirm password: " + confirmPassword);
            this.form.confirmPassword = confirmPassword;
        },
        getPassword(password) {
            console.log("Passoword: " + password)
            this.form.password = password;
        },

        register() {
            authHttp.register(this.form);
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 2rem;
    margin-bottom: 3.5rem;
}

.register__label {
    margin-bottom: 1rem;
}

.register {
    margin: 4rem 0;
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

.register__botao {
    margin: 0 auto 2rem auto;
    width: 50%;
}
</style>