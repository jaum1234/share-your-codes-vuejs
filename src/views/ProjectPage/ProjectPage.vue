<template>
    <div class="project">
        <div class="project__editor">
            <Editor
                :borderColor="project.cor"
                :savedCode="project.codigo"
                height="400px"
                :isActive="!active"/>
                <h2>{{ project.nome }}</h2>
        </div>
    </div>
</template>

<script>
import { projectHttp } from '../../domain/Http/Controllers/ProjectController.js';
import Editor from '../../components/shared/Editor/Editor.vue';

export default {
    components: {
        Editor
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

@media screen and (max-width: 1280px) {
    .project {
        width: 100%;
    }
}
</style>