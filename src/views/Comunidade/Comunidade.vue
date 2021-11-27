<template>
    <div class="comunidade">
        <div v-for="projeto in projetos" :key="projeto.id" class="projeto card">
            <Editor :borderColor="projeto.cor" :savedCode="projeto.codigo" :isActive="!active" height="300px" />
            <div class="card__body">
                <div>{{ projeto.nome }}</div>
                <p>{{ projeto.descricao }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';
import HttpRequest from '../../domain/HttpRequests.js';

var http = new HttpRequest();

export default {
    components: {
        Editor
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
.comunidade {
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

.card {
    display: flex;
    flex-direction: column;
}
</style>