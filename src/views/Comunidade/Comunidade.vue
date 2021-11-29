<template>
    <div class="comunidade">
        <div v-for="projeto in projetos" :key="projeto.id" class="projeto card">
            <Editor :borderColor="projeto.cor" :savedCode="projeto.codigo" :isActive="!active" height="300px" />
            <div class="card__body">
                <div class="projeto__nome">{{ projeto.nome }}</div>
                <p class="projeto__descricao">{{ projeto.descricao }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';
import HttpRequest from '../../domain/Http/HttpRequests.js';

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
    margin-bottom: 2rem;
}

.card__body {
    background: #041832;
    padding: 2rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: start;
}

.projeto__nome {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

</style>