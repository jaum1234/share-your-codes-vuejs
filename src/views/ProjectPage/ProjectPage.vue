<template>
    <div class="project">
        <div class="project__editor">
            <Editor
                :borderColor="project.cor"
                :savedCode="project.codigo"
                height="400px"
                :isActive="!active"/>
                <div>
                    <h2>{{ project.nome }}</h2>
                    <div>
                        <Botao tipo="botao" background="green" @click="shareOnWpp()">
                            <font-awesome-icon :icon="['fab', 'whatsapp']"/>
                        </Botao>
                        <Botao tipo="botao" background="white" @click="shareOnTwitter()">
                            <font-awesome-icon :icon="['fab', 'twitter']"/>
                        </Botao>
                    </div>
                </div>
        </div>
        
    </div>
</template>

<script>
import { projectHttp } from '../../domain/Http/Controllers/ProjectController.js';
import Editor from '../../components/shared/Editor/Editor.vue';
import Botao from '../../components/shared/Botao/Botao.vue';

export default {
    components: {
        Editor,
        Botao
    },
    data() {
        return {
            project: '',
        }
    },
    methods: {
        fetchProject() {
            projectHttp.show(this.$route.params.id)
                .then(res => {
                    console.log(res.data.projeto)
                    this.project = res.data.projeto[0]
                })
        },
        shareOnWpp() {
            window.open('https://api.whatsapp.com/send?text=http://localhost:8080' +  this.$route.fullPath);
        },
        shareOnTwitter() {
            window.open('https://twitter.com/intent/tweet?url=http://localhost:8080' + this.$route.fullPath);
        }
    },
    mounted() {
        this.fetchProject();
    }
}
</script>

<style scoped>
h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
    text-align: start;
}
.project {
    width: 80%;
}

.project__editor div:last-child {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

@media screen and (max-width: 1280px) {
    .project {
        width: 100%;
    }
}
</style>