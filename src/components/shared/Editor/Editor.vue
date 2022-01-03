<template>
    <pre v-highlightjs v-show="isActive" class="editor editor-highlight" :style="{ height: height, borderColor: borderColor }"><code class="javascript">{{ savedCode ? savedCode : code }}</code></pre>
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
import Cookies from 'js-cookie';

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
            code: ''
        }
    },
    methods: {
        escreverCodigo() {
            
            this.$emit('codigo-atualizado', this.code);
        },
        currentCode() {
            return this.code = this.savedCode ? this.savedCode : this.code; 
        }    
    },
   
    mounted() {
        Cookies.set('code', this.savedCode)
        this.currentCode();
    },
    
    
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