<template>
    <div class="projetos">
        <div v-for="(projeto, index) in projetos" :key="projeto.id" class="projeto">
            <CardProjeto @removed="removeFromList" :projeto="projeto" :index="index"/>
        </div>
    </div>
</template>

<script>
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue';
import UserRequests from '../../domain/Http/UserRequests.js';
import Cookies from 'js-cookie';

var http = new UserRequests();

export default {
    components: {
        CardProjeto
    },
    data() {
        return {
            projetos: []
        }
    },
    methods: {
        fetchProjetos() {
            var id = Cookies.get('user_id');
            http.projetos(id)
                .then(data => {
                    console.log(data);
                    this.projetos = data.projetos
                });
        },
        removeFromList(index) {
            this.projetos.splice(index, 1);
        }
    },
    mounted() {
        this.fetchProjetos();
    }
}
</script>

<style scoped>
.projetos {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
}

.projeto {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    width: 45%;
}
</style>