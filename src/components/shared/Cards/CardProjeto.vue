<template>
    <div class="card">
        <router-link :to="{ path: '/projeto/' + projeto.id }">
            <div class="card__head">
                <Editor :borderColor="projeto.cor" :savedCode="projeto.codigo" :isActive="!active" height="300px" />
            </div>
        </router-link>
        <div class="card__body">
            <div class="card__nome">{{ projeto.nome }}</div>
            <p class="card__descricao">{{ projeto.descricao }}</p>
            <div v-if="isUserProjectsPage()">
                <font-awesome-icon @click="remove" :icon="['fas', 'trash']" class="card__trash"/>
                <router-link :to="{ name: 'EditCode', params: { id: projeto.id } }">
                    <font-awesome-icon :icon="['fas', 'edit']" class="card__edit"/>
                </router-link>
            </div>
            <div v-else>
                {{ projeto.user.nickname }}
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '../Editor/Editor.vue';

export default {
    props: [
        'projeto',
        'index'
    ],
    components: {
        Editor
    },
    methods: {
        isUserProjectsPage() {
            if (this.$route.name === 'MyProjects') {
                return true;
            }
        },
        remove() {
            this.$swal({
                title: 'Tem certeza que deseja excluir esse projeto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Tem certeza que deseja excluir esse projeto?'
            }).then((result) => {
                if (result.isConfirmed) {
                
                this.$store.dispatch('projectsModule/destroy', this.projeto.id)
                    .then(() => {
                        this.$swal({
                                title: 'Projeto excluido!',
                                icon: 'success',
                                showConfirmButton: false,
                            })   
                            
                            setInterval(() => {
                                this.$router.go();  
                            }, 1000);
                    });
            }
            })
        }
    },
    mounted() {
        this.isUserProjectsPage();
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    margin: 0 0 2rem 0;
    width: 100%;
    
}

.card__body {
    background: #041832;
    color: white;
    padding: 2rem;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: start;
}

.card__nome {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card__descricao {
    margin-bottom: 2rem;
}

.card__trash {
    color: red;
    cursor: pointer;
    margin-right: 1rem;
}

.card__edit {
    color: aquamarine;
}
</style>