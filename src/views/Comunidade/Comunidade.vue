<template>
    <div class="comunidade">
        <div class="remover" v-show="search">
            <RemoveButton @click="removeSearchParam" label="Remover parametro de busca"/>
        </div>
        <div class="projetos">
            <div v-for="projeto in projetos" :key="projeto.id" class="projeto">
                <CardProjeto :projeto="projeto"/>
            </div>
        </div>
        <Pagination v-if="projetos.length" @page-changed="changePage" :total="total" :limit="limit" :offset="offset"/>
    </div>
</template>

<script>
import { projectHttp } from '../../domain/Http/Controllers/ProjectController.js';
import CardProjeto from '../../components/shared/Cards/CardProjeto.vue'
import Pagination from '../../components/shared/Pagination/Pagination.vue';
import Cookies from 'js-cookie';
import RemoveButton from '../../components/shared/Botao/Remove/RemoveButton.vue';

export default {
    components: {
        CardProjeto,
        Pagination,
        RemoveButton
    },
    data() {
        return {
            projetos: [],
            total: 0,
            limit: 4,
            offset: 1,
            search: false
        }
    },
    methods: {
        removeSearchParam() {
            Cookies.remove('search');
            this.search = false;
            this.fetchProjetos(this.offset);
        },
        fetchProjetos(offset) {
            projectHttp.index(offset, this.limit)
                .then(res => {
                    this.projetos = res.data.projetos;
                    this.total = res.data.total;
                });
        },
        searchedProjects(offset) {
            projectHttp.search(Cookies.get('search'), offset)
                .then(res => {
                    this.projetos = res.data.projetos;
                    this.total = res.data.total

                    if (this.projetos.length == 0) {
                        return this.$swal('Parece que nenhum projeto foi encontrado :(')
                    }
                });
        },
        
        changePage(data) {
            this.offset = data;
            if (Cookies.get('search')) {
                this.searchedProjects(this.offset);
            
                return;
            }
            this.fetchProjetos(this.offset);
        }
    },
    
    mounted() {
        if (Cookies.get('search')) {
            this.searchedProjects(this.offset);
            this.search = true;
            return;
        }
        this.search = false;
        this.fetchProjetos(this.offset);
    },
    computed: {
        projects() {
            if (Cookies.get('search')) {
                return this.searchedProjects(this.offset);
            
            }
            return this.fetchProjetos(this.offset);
        },
    }
    
}
</script>

<style scoped>


.comunidade {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.remover {
    align-items: center;
    display: flex;
    margin-bottom: 1rem;
}

.remover__botao {
    align-self: flex-start;
    margin-left: 2rem;
    background: red;
    border: transparent;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 5px;
}

.remover__label {
    color: red;
    margin-left: 0.5rem;
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

@media screen and (max-width: 1280px) {
    .comunidade {
        width: 100%;
    }

    .projetos {
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .projeto {
        width: 100%;
        margin: 0;
    }
}


</style>