<template>
    <div class="comunidade">
        <div class="projetos">
            <div v-for="projeto in projetos" :key="projeto.id" class="projeto">
                <router-link :to="{ path: '/projeto/' + projeto.id }">
                    <CardProjeto :projeto="projeto"/>
                </router-link>
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
    props: [
        'search'
    ],
    data() {
        return {
            projetos: [],
            total: 0,
            limit: 4,
            offset: 1,
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
            console.log('true')
            this.searchedProjects(this.offset);

            if (this.$route.name == 'Comunidade') {
                this.$router.go();
            }
            
            Cookies.remove('search');
            return;
        }
        console.log('false')
        this.fetchProjetos(this.offset);
    },
    unmounted() {
        Cookies.remove('search');
    },
    computed: {
        projects() {
            if (Cookies.get('search')) {
                return this.searchedProjects(this.offset);
            
            }
            return this.fetchProjetos(this.offset);
        }
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
    text-decoration: none;
    margin: 0 1rem;
    width: 45%;
}


</style>