<template>
    <div class="meus-projetos">
        <div class="projetos">
            <div v-for="(projeto, index) in projetos" :key="projeto.id" class="projeto">
                <CardProjeto @removed="removeFromList" :projeto="projeto" :index="index"/>
            </div>
        </div>
        <Pagination @page-changed="changePage" :total="total" :limit="limit" :offset="offset"/>
    </div>
</template>

<script>
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue';
import UserRequests from '../../domain/Http/UserRequests.js';
import Cookies from 'js-cookie';
import Pagination from '../../components/shared/Pagination/Pagination.vue';

var http = new UserRequests();

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
            var id = Cookies.get('user_id');
            http.projetos(id, offset, this.limit)
                .then(data => {
                    this.projetos = data.projetos;
                    this.total = data.total;
                });
        },
        removeFromList(index) {
            this.projetos.splice(index, 1);
        },
        changePage(data) {
            this.offset = data;
            this.fetchProjetos(data)
        }
    },
    mounted() {
        this.fetchProjetos(this.offset);
    }
}
</script>

<style scoped>
.meus-projetos {
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