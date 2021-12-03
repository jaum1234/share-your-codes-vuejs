<template>
    <div class="comunidade">
        <h1>{{ projetosBuscados }}</h1>
        <div class="projetos">
            <div v-for="projeto in projetos" :key="projeto.id" class="projeto">
                <CardProjeto :projeto="projeto"/>
            </div>
        </div>
        <Pagination v-if="projetos.length" @page-changed="changePage" :total="total" :limit="limit" :offset="offset"/>
    </div>
</template>

<script>
import { projectHttp } from '../../domain/Http/ProjectRequests.js';
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue'
import Pagination from '../../components/shared/Pagination/Pagination.vue';
import Cookies from 'js-cookie';

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
            offset: 1,
            procura: ''
        }
    },
    methods: {
        fetchProjetos(offset) {
            projectHttp.index(offset, this.limit)
                .then(data => {
                    this.projetos = data.projetos;
                    this.total = data.total;
                });
        },
        searchedProjects(offset) {
            projectHttp.search(Cookies.get('search'), offset)
                .then(data => {
                    this.projetos = data.projetos;
                    this.total = data.total
                });
        },
        changePage(data) {
            this.offset = data;
            this.fetchProjetos(data)
        }
    },
    mounted() {
        if (Cookies.get('search')) {
            this.searchedProjects(this.offset);
            return;
        }
        this.fetchProjetos(this.offset);
    },
    unmounted() {
        Cookies.remove('search');
    },
    updated() {
        console.log('ok');
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