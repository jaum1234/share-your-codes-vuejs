<template>
    <div class="card">
        <Editor :borderColor="projeto.cor" :savedCode="projeto.codigo" :isActive="!active" height="300px" />
        <div class="card__body">
            <div class="card__nome">{{ projeto.nome }}</div>
            <p class="card__descricao">{{ projeto.descricao }}</p>
            <div v-if="isUserProjectsPage()">
                <font-awesome-icon @click="remove" :icon="['fas', 'trash']" class="card__trash"/>
            </div>
            <div v-else>
                {{ projeto.user.nickname }}
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '../Editor/Editor.vue';
import { projectHttp } from '../../../domain/Http/ProjectRequests.js';

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
            if (this.$route.name === 'MeusProjetos') {
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
                
                projectHttp.delete(this.projeto.id)
                    .then(data => {
                        if (data.success) {
                            this.$swal({
                                title: 'Projeto excluido!',
                                icon: 'success',
                                showConfirmButton: false,
                            })   
                            
                            setInterval(() => {
                                this.$router.go();  
                            }, 1000);
                        }
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
    margin: 0 1rem 2rem 1rem;
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
}
</style>