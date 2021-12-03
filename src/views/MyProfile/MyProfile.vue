<template>
    <div class="my-profile">
        <form @submit.prevent="update" class="my-profile__form">
            <font-awesome-icon class="my-profile__profile-pic" :icon="['fas', 'user']"/>
            <div>
                <div v-for="field in fields" :key="field" class="my-profile__field">
                    <div class="my-profile__label">
                        <label>{{ field.name }}</label>
                    </div>
                        <Input
                            :tipo="field.inputType"
                            :placeholder="field.placeholder"
                            textAlign="center"
                            @value="field.inputGetter"
                            :defaultValue="field.defaultValue"
                            />
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
import Cookies from 'js-cookie';

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
        getEmail(email) {
            this.form.email = email;
        }
    },
    data() {
        return {
            fields: [
                {
                    name: 'Nickname',
                    inputType: 'text', 
                    placeholder: 'Seu nickname', 
                    inputGetter: this.getNickname,
                    defaultValue: Cookies.get('user_nickname')
                },
                {
                    name: 'E-mail',
                    inputType: 'email', 
                    placeholder: 'Seu e-mail', 
                    inputGetter: this.getEmail,
                    defaultValue: Cookies.get('user_email')
                },
            ],
            form: {
                nickname: '',
                email: ''
            }
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