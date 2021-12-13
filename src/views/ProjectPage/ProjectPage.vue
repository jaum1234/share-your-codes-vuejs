<template>
    <div class="project">
        <div class="project__editor">
            <Editor
                :borderColor="project.cor"
                :savedCode="project.codigo"
                height="400px"
                :isActive="!active"/>
        </div>
    </div>
</template>

<script>
import { projectHttp } from '../../domain/Http/ProjectRequests.js';
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
.project {
    width: 80%;
}

@media screen and (max-width: 1280px) {
    .project {
        width: 100%;
    }
}
</style>