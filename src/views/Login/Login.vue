<template>
    <div class="container--small">
        <div class="login">
            <div class="link--home">
                <router-link :to="{name: 'Comunidade'}" class="link">Home</router-link>
            </div>
            <h1 class="login__title">Login</h1>
            <form @submit.prevent="login">
                <div class="field login__email">
                    <div class="login__label"><label>Email</label></div>
                    <Input @value="getEmail" tipo="text"/>
                </div>
                <div class="field login__password">
                    <div class="login__label"><label>Senha</label></div>
                    <Input @value="getPassword" tipo="password"/>
                </div>
                <div class="login__botao">
                    <Botao type="submit" label="Fazer login" background="#5081FB"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Input from '../../components/shared/Form/Input.vue';
import AuthRequest from '../../domain/Http/AuthRequest';
import Botao from '../../components/shared/Botao/Botao.vue';

const http = new AuthRequest();

export default {
    components: {
        Input,
        Botao
    },
    data() {
        return {
            form: {
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
            http.store(this.form)
                .then(response => response.json())
                .then(data => console.log(data));
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
    margin-bottom: 2rem;
}

.login__botao {
    margin: 0 auto;
    width: 50%;
}
</style>