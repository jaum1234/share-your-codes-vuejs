<template>
    <div class="container--small">
        <div class="login">
            <div class="link--home">
                <router-link :to="{name: 'Comunity'}" class="link">Home</router-link>
            </div>
            <h1 class="login__title">Login</h1>
            <form @submit.prevent="login">
                <div class="fields">
                    <div class="field">
                        <label class="login__label">E-mail</label>
                        <input type="email" v-model="form.email" class="login__input login__email">
                        <small style="color: red">
                            {{ errors.email }}
                        </small>
                    </div>

                    <div class="field">
                        <label class="login__label">Senha</label>
                        <input type="password" v-model="form.password" class="login__input login__password">
                        <small style="color: red">
                            {{ errors.password }}
                        </small>
                    </div>
                       
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
import Botao from '../../components/shared/Botao/Botao.vue';

import { validator } from '../../domain/Service/Validator.js';

export default {
    components: {
        Botao
    },
    data() {
        return {
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
        login() {
            this.$store.dispatch('authModule/login', this.form)
                .then(res => {
                    if (res.success) {
                        this.$router.push({name: 'CodeEditor'});
                        this.$swal({
                            title: 'Recarregue a página para garantir que tudo funcione normalmente. :)',
                            icon: 'warning'
                        });
                        return;   
                    }
                    
                    validator.validate(this.errors, res.data.erros);
                });
               
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 2rem;
    margin-bottom: 3.5rem;
}

.login__input {
    margin-top: 1rem;
    text-align: center;
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

.fields {
    margin-bottom: 1rem;
}

.field {
    margin-top: 1rem;
}

.login__botao {
    margin: 0 auto 2rem auto;
    width: 50%;
}
</style>