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
                    
                    <div v-if="isLogged()" class="logged">
                        <button class="navbar__ham" @click="toggleNav">
                            <font-awesome-icon :icon="['fas', 'bars']" />
                        </button>
                        <transition name="mobile-nav">
                            <ul class="nav__dropdown" v-show="nav">
                                <li class="nav__item">
                                    <div>
                                        <font-awesome-icon :icon="['fas', 'user']"/>
                                        <div>{{ nickname }}</div>
                                    </div>
                                    <div>
                                        <RemoveButton @click="toggleNav"/>
                                    </div>
                                </li>
                               
                                <li class="nav__item nav__item--editor" v-if="mobile">
                                    <router-link :to="{ name: 'CodeEditor' }">Editor de Código</router-link>
                                </li>
                                <li class="nav__item nav__item--comunidade" v-if="mobile">
                                    <router-link :to="{ name: 'Comunity' }">Comunidade</router-link>
                                </li>
                              
                                <li class="nav__item">
                                    <router-link :to="{ name: 'MyProfile' }">Meu Perfil</router-link>
                                </li>
                                <li class="nav__item">
                                    <router-link :to="{ name: 'MyProjects' }">Meus Projetos</router-link>
                                </li>
                                <li class="nav__item" @click="logout">Logout</li>
                            </ul>
                        </transition>
                    </div>
                    <router-link v-else :to="{name: 'Login'}" class="not-logged">
                        <font-awesome-icon :icon="['fas', 'user']" class="login__icon"/>
                        <div  class="login__text login__text--login">Login</div>
                    </router-link>
                    
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import Cookies from 'js-cookie';
import RemoveButton from '../Botao/Remove/RemoveButton.vue';
import { tokenParser } from '../../../mixins';
export default {
    mixins: [tokenParser],
    components: {
        RemoveButton
    },
    data() {
        return {
            nomeProjetos: '',
            logo: require('/static/img/aluradev.png'),
            nickname: '',
            active: false,
            scrollPosition: null,
            nav: false,
            mobile: false
        }
    },
    methods: {
        isLogged() {
            if (this.parseAccessToken()) {
                this.nickname = Cookies.get('user_nickname');
                return true;
            }
            return false;
        },
        toggleNav() {
            this.nav = !this.nav;
        },
        checkScreen() {
            if (window.innerWidth <= 1280) {
                this.mobile = true;
                return
            }
            this.mobile = false;
            return;
        },
        logout() {
            this.$store.dispatch('authModule/logout')
        },
        searchProject() {
            Cookies.set('search', this.nomeProjetos);
            this.nomeProjetos = '';

            if (this.$route.name == 'Comunity') {
                this.$router.go();
                return;
            }

            this.$router.push({ name: 'Comunity' });
        }
    },
    created() {
        this.isLogged();
        this.checkScreen();

        window.addEventListener('resize', this.checkScreen);
    },
    
}
</script>

<style scoped>
.remover__botao {
    align-self: flex-start;
    margin-left: 2rem;
    background: red;
    border: transparent;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    
}

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
    background: transparent;
    border: 1px solid transparent;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
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
    text-transform: uppercase;
   
}

.nav__dropdown li:first-child {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    margin-bottom: 2rem !important;
    width: 100%;
}

.nav__dropdown li:first-child div {
    display: flex;
}

.nav__dropdown li:first-child > div:last-child {
   
    color: white;
    cursor: pointer;
    font-size: 15px;
    
    font-weight: bold;
    margin-right: 1rem;
}

.nav__dropdown li:last-child {
    color: red;
    cursor: pointer;
    font-weight: bold;
    margin-top: 2rem !important;
}

.nav__dropdown .nav__item--comunidade {
    font-weight: 400 !important;
}

.nav__dropdown li:first-child div {
    align-self: flex-end;
    margin-left: 0.5rem;
}

.mobile-nav-enter-active, .mobile-nav-leave-active {
    transition: 1s ease all;
}

.mobile-nav-enter-from, .mobile-nav-leave-to {
    transform: translateX(-300px);
}

.mobile-nav-enter-to {
    transform: translateX(0);
}
</style>