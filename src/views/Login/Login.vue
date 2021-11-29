<template>
    <div class="container--small">
        <div class="login">
            <div class="link--home">
                <router-link :to="{name: 'Comunidade'}" class="link">Home</router-link>
            </div>
            <h1 class="login__title">Login</h1>
            <form>
                <div class="field login__email">
                    <div class="login__label"><label>Email</label></div>
                    <Input tipo="text"/>
                </div>
                <div class="field login__password">
                    <div class="login__label"><label>Senha</label></div>
                    <Input tipo="password"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Input from '../../components/shared/Form/Input.vue';

export default {
    components: {
        Input
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
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
</style>