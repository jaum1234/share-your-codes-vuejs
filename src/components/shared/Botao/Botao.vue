<template>
    <button :style="{background: background, color: corLabel}" :type="tipo">{{ label }}</button>
</template>

<script>

export default {
    props: [
        'label',
        'tipo',
        'background',
        'corLabel'
    ],
}
</script>

<style scoped>
button {
    border-width: 0;
    border-radius: 5px;
    cursor: pointer;
    padding: 1rem;
    width: 100%;
}
</style>