<template>
    <div class="container--small">
        <div class="register">
            <div class="link--home">
                <router-link :to="{name: 'Comunity'}" class="link">Home</router-link>
            </div>
            <h1 class="register__title">Cadastro</h1>
            <form @submit.prevent="register">
                <div class="fields" >
                    <div class="field">
                        <label>E-mail</label>
                        <input type="email" v-model="form.email"/>
                        <small style="color: red" >
                            {{ errors.email }}
                        </small>
                    </div>
                    <div class="field">
                        <label>Nome</label>
                        <input type="text" v-model="form.name"/>
                        <small style="color: red" >
                            {{ errors.name }}
                        </small>
                    </div>
                    <div class="field">
                        <label>Nickname</label>
                        <input type="text" v-model="form.nickname"/>
                        <small style="color: red" >
                            {{ errors.nickname }}
                        </small>
                    </div>
                    <div class="field">
                        <label>Senha</label>
                        <input type="password" v-model="form.password"/>
                        <small style="color: red" >
                            {{ errors.password }}
                        </small>
                    </div>
                    <div class="field">
                        <label>Confimar senha</label>
                        <input type="password" v-model="form.password_confirmation"/>
                        <small style="color: red" >
                            {{ errors.password_confirmation }}
                        </small>
                    </div>
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
import Botao from '../../components/shared/Botao/Botao.vue';

import { authHttp } from '../../domain/Http/Controllers/AuthController.js';
import { validator } from '../../domain/Service/Validator.js';

export default {
    components: {
        Botao
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                name: '',
                nickname: '',
                password_confirmation: ''
            },
            errors: {
                email: '',
                name: '',
                password: '' ,
                nickname: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        register() {
            authHttp.register(this.form)
                .then(res => {
                    if (res.success) {
                        this.$router.push({ name: 'Login' });
                        this.$swal({
                            title: 'Cadastro realizado com sucesso!',
                            icon: 'success'
                        })
                        return;
                    }
                    validator.validate(this.errors, res.data.erros);
                    
                })
                
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 2rem;
    margin-bottom: 3.5rem;
}

input {
    margin-top: 1rem;
    text-align: center;
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

@media screen and (max-width: 1280px) {
    .register__botao {
        width: 100%
    }
}
</style>