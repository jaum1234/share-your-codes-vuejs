<template>
    <div class="container--small">
        <div class="register">
            <div class="link--home">
                <router-link :to="{name: 'Comunity'}" class="link">Home</router-link>
            </div>
            <h1 class="register__title">Cadastro</h1>
            <form @submit.prevent="register">
                <div v-for="field in fields" :key="field" class="field" :class="field.class">
                    <div class="register__label"><label>{{ field.label }}</label></div>
                    <Input textAlign="center" @value="field.inputGetter" :tipo="field.inputType"/>
                    <small style="color: red" v-for="error in field.errors" :key="error">
                        {{ error }}
                    </small>
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
                    label: 'E-mail',
                    name: 'email',
                    class: 'register__email', 
                    inputGetter: this.getEmail, 
                    inputType: 'email',
                    errors: []
                },
                {
                    label: 'Nome',
                    name: 'name',
                    class: 'register__name', 
                    inputGetter: this.getName, 
                    inputType: 'text',
                    errors: []
                },
                {
                    label: 'Nickname',
                    name: 'nickname', 
                    class: 'register__nickname', 
                    inputGetter: this.getNickname, 
                    inputType: 'text',
                    errors: []
                },
                {
                    label: 'Senha',
                    name: 'password', 
                    class: 'register__password', 
                    inputGetter: this.getPassword, 
                    inputType: 'password',
                    errors: []
                },
                {
                    label: 'Confirmar senha',
                    name: 'password_confirmation', 
                    class: 'register__confirm-password', 
                    inputGetter: this.getConfirmPassword, 
                    inputType: 'password',
                    errors: []
                }
            ],
            form: {
                email: '',
                password: '',
                name: '',
                nickname: '',
                password_confirmation: ''
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
        getName(name) {
            this.form.name = name;
        },
        getConfirmPassword(confirmPassword) {
            console.log("Confirm password: " + confirmPassword);
            this.form.password_confirmation = confirmPassword;
        },
        getPassword(password) {
            console.log("Passoword: " + password)
            this.form.password = password;
        },

        register() {
            authHttp.register(this.form)
                .then(res => {
                    if (res.success) {
                        console.log(res);
                        this.$router.push({ name: 'Login' });
                        return;
                    }
                    console.log(res)
                    const responseErrorKeys = Object.keys(res.data.erros);
                    responseErrorKeys.forEach((responseErrorKey) => {
                    
                        this.fields.forEach(field => {
                            if (responseErrorKey == field.name) {
                                field.errors = res.data.erros[responseErrorKey];
                            }

                            setTimeout(() => {
                                field.errors = [];
                            }, 3000);
                        })
                    });
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