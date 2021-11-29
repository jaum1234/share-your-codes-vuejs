<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar__bar">
                <div class="navbar__logo">
                    <img :src="logo" alt="" class="navbar__img">
                </div>
                <div class="navbar__search">
                    <input placeholder="Busque por algo" type="search" v-model="projetos" class="navbar__input">
                </div>
                <router-link to="/login" class="navbar__login">
                    <font-awesome-icon :icon="['fas', 'user']" class="login__icon"/>
                    <div v-if="isLogged()" class="login__text login__text--logged">
                        Nome do usuario
                        <div @click="logout" class="login__logout">Logout</div>
                    </div>
                    <div v-else class="login__text login__text--login">Login</div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import Cookie from 'js-cookie';

export default {
    data() {
        return {
            projetos: '',
            logo: require('/static/img/logo.png')
        }
    },
    methods: {
        isLogged() {
            if (Cookie.get('user_email')) {
                return true;
            }
            return false;
        },
        logout() {
            Cookie.remove('_myapp_token');
            Cookie.remove('user_email');
            Cookie.remove('user_nickname');

            this.logged = false;
        }
    },
    created() {
        this.isLogged();
    }
}
</script>

<style scoped>
.navbar__bar {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
}

.navbar__img {
    width: 135px;
    height: auto;
}

.navbar__logo {
    justify-content: flex-start;
    width: calc(100% - 80%)
}

.navbar__search {
    width: 100%;
}

.navbar__input {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    padding: 1rem;
    width: 60%;
    
}

.navbar__login {
    color: white;
    display: flex;
    justify-content: flex-end;
        text-decoration: none;

    width: calc(100% - 80%);

}

.login__text {
    margin-left: 1rem;
}

.login__text--login {
    color: blue;
    font-weight: bold;
}

.login__logout {
    color: red;
    font-weight: bold;
}
</style>