<template>
    <div class="botao__remover">
        <button class="botao">
            x
        </button>
        <div class="label">
            Remover critério de busca
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.botao {
    align-self: flex-start;
    margin-left: 2rem;
    background: red;
    border: transparent;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 5px;
}

.label {
    color: red;
    margin-left: 0.5rem;
}
</style>