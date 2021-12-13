<template>
    <header :class="{ 'scrolled-nav': scrollPosition }">
        <nav class="navbar">
            <div class="container">
                <div class="navbar__bar">
                    <div class="navbar__logo">
                        <img :src="logo" alt="" class="navbar__img">
                    </div>
                    <div class="navbar__search">
                        <form @submit.prevent="searchProject">
                            <input placeholder="Busque por algo" type="search" v-model="nomeProjetos" class="navbar__input">
                        </form>
                    </div>
                    
                    <div class="navbar__login" v-show="!mobile">
                        <div v-if="isLogged()" class="logged">
                            <div class="user" @click="isActive">
                                <font-awesome-icon :icon="['fas', 'user']" class="login__icon"/>
                                <div class="login__text login__text--logged">{{ nickname }}</div>
                                <font-awesome-icon :icon="['fas', 'sort-down']" class="login__icon"/>
                            </div>
                            <ul class="login__lista" v-show="active">
                                <li class="login__item">
                                    <router-link class="login__link" :to="{name: 'MeusProjetos'}">Meus projetos</router-link>
                                </li>
                                <li class="login__item">
                                    <router-link class="login__link" :to="{name: 'MeuPerfil'}">Meu Perfil</router-link>
                                </li>
                                <li @click="logout" class="login__logout login__item">Logout</li>
                            </ul>
                        </div>
                        <router-link v-else :to="{name: 'Login'}" class="not-logged">
                            <font-awesome-icon :icon="['fas', 'user']" class="login__icon"/>
                            <div  class="login__text login__text--login">Login</div>
                        </router-link>
                    </div>
                    <button class="navbar__ham" @click="toggleMobileNav" v-show="mobile" :class="{ 'icon-active': mobileNav }">
                        <font-awesome-icon :icon="['fas', 'bars']" />
                    </button>
                    <transition name="mobile-nav">
                        <ul class="nav__dropdown" v-show="mobileNav">
                            <li>{{ nickname }}</li>
                            <li>Editor de Código</li>
                            <li>Comunidade</li>
                            <li>Meu Perfil</li>
                            <li>Meus Projetos</li>
                        </ul>
                    </transition>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import Cookies from 'js-cookie';
import { authHttp } from '../../../domain/Http/AuthRequest.js';

export default {
    data() {
        return {
            nomeProjetos: '',
            logo: require('/static/img/logo.png'),
            nickname: '',
            active: false,
            scrollPosition: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null
        }
    },
    methods: {
        isLogged() {
            if (Cookies.get('_myapp_token')) {
                this.nickname = Cookies.get('user_nickname');
                return true;
            }
            return false;
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 1280) {
                this.mobile = true;
                return;
            }

            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        logout() {
            authHttp.logout();
        },
        isActive() {
            return this.active = !this.active;
        },
        searchProject() {
            Cookies.set('search', this.nomeProjetos);
            this.nomeProjetos = '';

            if (this.$route.name == 'Comunidade') {
                this.$router.go();
                return;
            }

            this.$router.push({ name: 'Comunidade' });
        }
    },
    created() {
        this.isLogged();
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    
}
</script>

<style scoped>
.navbar {
    width: 100%;
    transition: 0.5 ease all;    
}

.navbar__bar {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
}

.navbar__ham {
    display: flex;
   
}

.not-logged {
    color: white;
    display: flex;
    justify-content: flex-end;
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
    text-decoration: none;
    width: calc(100% - 80%);

}

.login__icon {
    margin-right: 0.5rem;
}

.login__text {
    margin: 0 1rem 0 0.5rem;
}

.login__text--login {
    color: blue;
    font-weight: bold;
}

.login__logout {
    color: red;
    cursor: pointer;
    font-weight: bold;
}

.login__link {
    color: black;
    text-decoration: none;
}

.login__lista {
    background: white;
    border-radius: 2px;
    padding: 0.6rem;
    position: absolute;
    text-align: start;
    top: 100%;
    width: 150px;
}

.login__icon {
    align-self: center;
}

.login__item {
    margin: 0.8rem 0;
}

.login__link:hover {
    color: rgb(119, 119, 119);
}

.user {
    display: flex;
    cursor: pointer;
    margin-block: 0.5rem;
}

.logged {
    display: flex;
    flex-direction: column;
    position: relative;
}

.icon-active {
    transform: rotate(180deg);
}

.nav__dropdown {
    display: flex;
    flex-direction: column;
    align-items: start;
    position: fixed;
    width: 100%;
    max-width: 300px;
    padding: 2rem 0 0 1rem;
    height: 100%;
    background: white;
    top: 0;
    left: 0;
}

.nav__dropdown li {
    color: black;
    margin-bottom: 0.8rem;
}
</style>