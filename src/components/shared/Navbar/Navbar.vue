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
                <div class="navbar__login">
                    <router-link to="/projetos" class="login__text">Login</router-link>
                    <font-awesome-icon :icon="['fas', 'user']" class="login__icon"/>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            projetos: '',
            logo: require('/static/img/logo.png')
        }
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
    width: calc(100% - 80%);

}

.login__text {
    margin-right: 1rem;
}
</style>