<template>
    <textarea :placeholder="placeholder" v-model="value" @input="exportValue()"></textarea>
</template>

<script>
export default {
    props: [
        'placeholder'
    ],
    data() {
        return {
            value: ''
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