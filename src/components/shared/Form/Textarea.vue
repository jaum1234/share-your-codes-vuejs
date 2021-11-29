<template>
    <textarea :value="valor" :placeholder="placeholder"></textarea>
</template>

<script>
export default {
    
}
</script>

<style scoped>
textarea {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    height: 100px;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    resize: none;
}
</style>