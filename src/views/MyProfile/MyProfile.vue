<template>
    <div class="my-profile">
        <form @submit.prevent="update" class="my-profile__form">
            <font-awesome-icon class="my-profile__profile-pic" :icon="['fas', 'user']"/>
            <div>
                <div v-for="field in fields" :key="field" class="my-profile__field">
                    <div class="my-profile__label">
                        <label>{{ field.label }}</label>
                    </div>
                    <Input
                        :tipo="field.inputType"
                        :placeholder="field.placeholder"
                        textAlign="center"
                        @value="field.inputGetter"
                        :defaultValue="field.defaultValue"
                        />
                    <small v-for="error in field.errors" :key="error" style="color: red">
                        {{ error }}
                    </small>
                </div>
                <div style="width: 150px; margin: 0 auto">
                    <Button label="Salvar alteraçoes" background="#5081FB"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Input from '../../components/shared/Form/Input.vue';
import Button from '../../components/shared/Botao/Botao.vue';
import { userHttp } from '../../domain/Http/UserRequests.js';
//import { validator } from '../../domain/Errors/ValidationErrors';
import Cookies from 'js-cookie';
//import { validator } from '../../domain/Errors/ValidationErrors';

export default {
    components: {
        Input,
        Button
    },
    methods: {
        getNickname(nickname) {
            this.form.nickname = nickname;
            console.log(this.form.nickname)
        },
        getName(name) {
            this.form.name = name;
        },
        update() {
            userHttp.update(Cookies.get('user_id'), this.form)
            .then(data => {
                if (data.success) {
                    Cookies.set('user_nickname', data.dados.new_nickname);
                    Cookies.set('user_name', data.dados.new_name);

                    this.$swal({
                        title: 'Dados atualizados com sucesso!',
                        icon: 'success'
                    });
                    return;
                }

                const responseErrorKeys = Object.keys(data.erros);
                responseErrorKeys.forEach((responseErrorKey) => {
                    
                    this.fields.forEach(field => {
                        if (responseErrorKey == field.name) {
                            field.errors = data.erros[responseErrorKey];
                        }

                        setTimeout(() => {
                            field.errors = [];
                        }, 3000);
                    })
                })

            });
        },
    },
    data() {
        return {
            fields: [
                {
                    label: 'Nickname',
                    name: 'nickname',
                    inputType: 'text', 
                    placeholder: 'Seu nickname', 
                    inputGetter: this.getNickname,
                    defaultValue: Cookies.get('user_nickname'),
                    errors: []
                },
                {
                    label: 'Name',
                    name: 'name',
                    inputType: 'text', 
                    placeholder: 'Seu nome', 
                    inputGetter: this.getName,
                    defaultValue: Cookies.get('user_name'),
                    errors: []
                },
            ],
            form: {
                nickname: '',
                name: ''
            },
            
        }
    },
    
}
</script>

<style scoped>
.my-profile {
    width: 80%;
}

.my-profile__form {
    margin: 0 auto;
    width: 500px;
}

.my-profile__profile-pic {
    font-size: 5rem;
    margin-bottom: 2rem;
}

.my-profile__field {
    margin-bottom: 2rem;
}

.my-profile__label {
    margin-bottom: 1rem;
}
</style>