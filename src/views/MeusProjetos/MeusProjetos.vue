<template>
    <div class="meus-projetos">
        <div class="projetos">
            <div v-for="(projeto, index) in projetos" :key="projeto.id" class="projeto">
                <CardProjeto :projeto="projeto" :index="index"/>
            </div>
        </div>
        <Pagination v-if="projetos.length" @page-changed="changePage" :total="total" :limit="limit" :offset="offset"/>
    </div>
</template>

<script>
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue';
import Pagination from '../../components/shared/Pagination/Pagination.vue';

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
            var userId = this.$store.getters['usersModule/user'].id;
            this.$store.dispatch('usersModule/projects', {id: userId, page: offset, limit: this.limit})
                .then(res => {
                    this.projetos = res.data.projetos;
                    this.total = res.data.total;
                });
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

@media screen and (max-width: 1280px) {
    .meus-projetos {
        width: 100%;
    }

    .projeto {
        width: 100%;
    }
}
</style>