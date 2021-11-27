<template>
    <textarea class="editor" name="editor" id="editor" :class="style"></textarea>    
</template>

<script>
export default {
    props: [
        'style'
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
    resize: none;
}
</style>