<template>
    <div class="my-profile">
        <form @submit.prevent="update" class="my-profile__form">
            <font-awesome-icon class="my-profile__profile-pic" :icon="['fas', 'user']"/>
            <div>
                <div class="fields">
                    <div class="field">
                        <label>Nickname</label>
                        <input type="text" v-model="form.nickname">
                        <small style="color: red">
                            {{ errors.nickname }}
                        </small>
                    </div>
                    <div class="field">
                        <label>Nome</label>
                        <input type="text" v-model="form.name">
                        <small style="color: red">
                            {{ errors.name }}
                        </small>
                    </div>
                </div>
                <div style="width: 150px; margin: 0 auto">
                    <Button label="Salvar alteraçoes" background="#5081FB"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Button from '../../components/shared/Botao/Botao.vue';
import Cookies from 'js-cookie';

import { validator } from '../../domain/Service/Validator';

export default {
    components: {
        Button
    },
    mounted() {
        const user = this.$store.getters['usersModule/user'];

        this.form.nickname = user.nickname;
        this.form.name = user.name;
    },
    methods: {
        update() {
            var userId = this.$store.getters['usersModule/user'].id;
            this.$store.dispatch('usersModule/update', {id: userId, data: this.form})
            .then(res => {
                if (res.success) {
                    Cookies.set('user_nickname', res.data.new_nickname);
                    Cookies.set('user_name', res.data.new_name);

                    this.$swal({
                        title: 'Dados atualizados com sucesso!',
                        icon: 'success'
                    });
                    return;
                }
                validator.validate(this.errors, res.data.erros);
            });
        },
    },
    data() {
        return {
            form: {
                nickname: '',
                name: ''
            },
            errors: {
                nickname: '',
                name: ''
            }
        }
    },
    
}
</script>

<style scoped>
.my-profile {
    width: 80%;
}

input {
    margin-top: 1rem;
    text-align: center;
    width: 100%;
}

.my-profile__form {
    margin: 0 auto;
    width: 500px;
}

.my-profile__profile-pic {
    font-size: 5rem;
    margin-bottom: 2rem;
}

.fields {
    margin-bottom: 2rem;
}

.my-profile__label {
    margin-bottom: 1rem;
}

@media screen and (max-width: 1280px) {
    .my-profile {
        width: 100%;
    }

    .my-profile__form {
        width: 100%;
    }
}
</style>