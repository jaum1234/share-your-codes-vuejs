<template>
    <div class="projetos">
        <div v-for="projeto in projetos" :key="projeto.id" class="projeto">
            <CardProjeto :projeto="projeto"/>
        </div>
    </div>
</template>

<script>
import ProjectRequests from '../../domain/Http/ProjectRequests.js';
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue'

var http = new ProjectRequests();

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
                .then(data => {
                    console.log(data);
                    this.projetos = data.projetos;
                });
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