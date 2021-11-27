<template>
    <pre v-highlightjs v-show="isActive" class="editor editor--highlight" :style="{height: height, borderColor: borderColor}"><code class="javascript">{{ code ? code : savedCode }}</code></pre>
    <textarea 
        class="editor"
        name="codigo" 
        @input="escreverCodigo"
        id="editor" 
        v-model="code"
        :style="{height: height, borderColor: borderColor}"
        v-show="!isActive"
        ></textarea>   
</template>

<script>
export default {
    props: [
        'height',
        'borderColor',
        'isActive',
        'savedCode'
    ],
    emits: ["codigo-atualizado"],
    data() {
        return {
            code: '',
        }
    },
    methods: {
        escreverCodigo() {
            this.$emit('codigo-atualizado', this.code);
        }
    }
}
</script>

<style scoped>
.editor {
    background: #221A0F;
    color: white;
    border: 30px solid;
    border-radius: 5px;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    resize: none;
    width: 100%;
}

.editor--highlight {
    font-family: monospace;
    text-align: start;
    line-height: 1.2rem;
    max-width: 750px;
    overflow-wrap: break-word;
}

code {
    max-height: 260px;
}



</style>