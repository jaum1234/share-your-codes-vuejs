<template>
    <input 
        :type="tipo" 
        :placeholder="placeholder" 
        :name="nome" 
        :style="{textAlign: textAlign}"
        v-model="value" 
        @input="exportValue()">
</template>

<script>
export default {
    props: [
        'tipo',
        'placeholder',
        'nome',
        'textAlign',
        'defaultValue'
    ],
    data() {
        return {
            value: this.defaultValue
        }
    },
    methods: {
        exportValue() {
            this.$emit('value', this.value);
        }
    },
    mounted() {
        this.exportValue();
    }
}
</script>

<style scoped>
input {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}
</style>