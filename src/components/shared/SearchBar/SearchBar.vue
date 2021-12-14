<template>
<form @submit.prevent="searchProject">
    <input placeholder="Busque por algo" type="search" v-model="nomeProjetos" class="navbar__input">
</form>    
</template>

<script>
import Cookies from 'js-cookie';

export default {
    methods: {
        searchProject() {
            Cookies.set('search', this.nomeProjetos);
            this.nomeProjetos = '';

            if (this.$route.name == 'Comunity') {
                this.$router.go();
                return;
            }

            this.$router.push({ name: 'Comunity' });
        }
    }    
}
</script>

<style scoped>

</style>