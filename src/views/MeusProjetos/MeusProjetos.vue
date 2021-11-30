<template>
    <div class="projetos">
        <div v-for="projeto in projetos" :key="projeto.id" class="projeto">
            <CardProjeto :projeto="projeto"/>
        </div>
    </div>
</template>

<script>
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue';
import HttpRequest from '../../domain/Http/HttpRequests.js';

var http = new HttpRequest();

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
            http.index()
                .then(data => this.projetos = data.projetos.data);
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