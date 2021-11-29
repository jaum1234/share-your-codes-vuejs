<template>
    <input name="cor" type="color" v-model="cor" @input="exportValue()">
</template>

<script>
export default {
    data() {
        return {
            cor: '#6bd1ff'
        }
    },
    methods: {
        exportValue() {
            this.$emit('color', this.cor);
        }
    },
    mounted() {
        this.exportValue();
    }
}
</script>

<style scoped>
input[type="color"] {
	-webkit-appearance: none;
    border-radius: 5px;
    outline: none;
    width: 100%;
    height: 55px;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    background: #051D3B;
	padding: 0.5rem;
    border-radius: 5px;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
    border-radius: 5px;
}
</style>