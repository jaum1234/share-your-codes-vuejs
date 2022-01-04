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
                        <button @click="shareOnWpp()" class="button--wpp">
                            <font-awesome-icon :icon="['fab', 'whatsapp']"/>
                        </button>
                        <button @click="shareOnTwitter()" class="button--twitter">
                            <font-awesome-icon :icon="['fab', 'twitter']"/>
                        </button>
                    </div>
                </div>
        </div>
        
    </div>
</template>

<script>
import { projectHttp } from '../../domain/Http/Controllers/ProjectController.js';
import { sharer } from '../../domain/Service/Sharer.js';

import Editor from '../../components/shared/Editor/Editor.vue';

export default {
    components: {
        Editor,
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
                    this.project = res.data.projeto[0]
                })
        },
        shareOnWpp() {
            sharer.shareOnWpp(this.$route.fullPath)
        },
        shareOnTwitter() {
            sharer.shareOntwitter(this.$route.fullPath);
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

button {
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    margin: 0 0.4rem;

    height: 35px;
    width: 35px;
}

.button--wpp {
    background: green;
}

.button--twitter {
    background: rgb(114, 184, 207);
}

@media screen and (max-width: 1280px) {
    .project {
        width: 100%;
    }
}
</style>