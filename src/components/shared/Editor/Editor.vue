<template>
    <pre v-highlightjs v-show="isActive" class="editor editor-highlight" :style="{ height: height, borderColor: borderColor }"><code class="javascript">{{ code ? code : savedCode }}</code></pre>
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
        'savedCode',
        'isMobile'
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
    padding: 0.5rem;
    font-size: 1rem;
    resize: none;
    width: 100%;
}

.editor-highlight {
    font-family: monospace;
    text-align: start;
    line-height: 1.2rem;
    max-width: 100%;
    overflow-wrap: break-word;
}

code {
    height: 100%;
    width: 100%;
}



</style>