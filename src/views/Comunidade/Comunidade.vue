<template>
    <div class="comunidade">
        <div class="projeto">
            <Editor borderColor="black" savedCode="" :isActive="!active" height="300px"/>
        </div>
    </div>
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';

export default {
    components: {
        Editor
    },
    data() {
        //projetos: [];
    },
    methods: {
        fetchProjetos() {
            fetch('http://localhost:3000/api/projetos', {method: 'GET'})
                .then(res => res.json())
                .then(data => console.log(data));
        }
    },
    mounted() {
        this.fetchProjetos();
    }
}
</script>

<style scoped>
.comunidade {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
}

.projeto {
    margin: 0 1rem;
    width: 45%;
}
</style>