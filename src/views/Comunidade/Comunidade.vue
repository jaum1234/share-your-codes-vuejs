<template>
    <div class="comunidade">
        <div class="projetos">
            <div v-for="projeto in projetos" :key="projeto.id" class="projeto">
                <CardProjeto :projeto="projeto"/>
            </div>
        </div>
        <Pagination @page-changed="changePage" :total="total" :limit="limit" :offset="offset"/>
    </div>
</template>

<script>
import ProjectRequests from '../../domain/Http/ProjectRequests.js';
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue'
import Pagination from '../../components/shared/Pagination/Pagination.vue';

var http = new ProjectRequests();

export default {
    components: {
        CardProjeto,
        Pagination
    },
    data() {
        return {
            projetos: [],
            total: 0,
            limit: 4,
            offset: 1
        }
    },
    methods: {
        fetchProjetos(offset) {
            http.index(offset, this.limit)
                .then(data => {
                    this.projetos = data.projetos;
                    this.total = data.total;
                });
        },
        changePage(data) {
            this.offset = data;
            this.fetchProjetos(data)
        }
    },
    created() {
        this.fetchProjetos(this.offset);
    }
}
</script>

<style scoped>
.comunidade {
    width: 80%;
}

.projetos {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.projeto {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    width: 45%;
}


</style>