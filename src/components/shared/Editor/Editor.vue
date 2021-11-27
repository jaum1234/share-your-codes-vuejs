<template>
    <textarea 
        class="editor" 
        name="editor" 
        id="editor" 
        :style="{height: height, borderColor: borderColor}"></textarea>   
    <button class="botao__editor">Visualizar om highlight</button>
</template>

<script>
export default {
    props: [
        'height',
        'borderColor'
    ],
}
</script>

<style scoped>
.editor {
    background: #141414;
    color: white;
    border-radius: 5px;
    border-width: 30px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    resize: none;
    width: 100%;
}

.botao__editor {
    background: #0B254A;
    border-width: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 1rem;
    width: 100%;

}
</style>