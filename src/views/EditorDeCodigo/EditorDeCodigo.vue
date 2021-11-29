<template>
    <form @submit.prevent="salvar" class="editor">
        <div class="projeto__editor">
            <Editor @codigo-atualizado="getCodigo" height="350px" :borderColor="form.cor" :isActive="active"/>
            <Botao @click="highlight" tipo="button" corLabel="white" background="#0B254A" label="Visualizar com highlight" />
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <Input @value="getNome" tipo="text" placeholder="Nome do projeto" v-model="form.nome"/>
                <Textarea @value="getDescricao" placeholder="Descricao do projeto" v-model="form.descricao"/>
            </div>
            <div class="info personalizacao">
                <h3 class="titulo personalizacao__titulo">PERSONALIZAÇAO</h3>
                <ColorInput @color="getColor"/>
            </div>
            <div class="botao__salvar">
                <Botao background="#5081FB" label="Salvar projeto"/>
            </div>
        </div>
    </form> 
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';
import HttpRequests from '../../domain/Http/HttpRequests.js';
import Botao from '../../components/shared/Botao/Botao.vue';
import Input from '../../components/shared/Form/Input.vue';
import Textarea from '../../components/shared/Form/Textarea.vue';
import ColorInput from '../../components/shared/Form/ColorInput.vue';

const http = new HttpRequests();

export default {
    data() {
        return {
            form: {
                codigo: '',
                nome: '',
                descricao: '',
                cor: '',
            },
            active: false,
        }
    },
    components: {
        Editor,
        Botao,
        Input,
        Textarea,
        ColorInput
    },
    methods: {
        highlight() {
            this.active = !this.active;
            console.log(this.form.descricao);

        },
        getCodigo(codigo) {
            this.form.codigo = codigo;
        },
        getColor(color) {
            console.log(color);
            this.form.cor = color;
        },
        getNome(nome) {
            console.log(nome);
            this.form.cor = nome;
        },
        getDescricao(descricao) {
            console.log(descricao);
            this.form.cor = descricao;
        },
        salvar() {
            http.store(this.form)
                .then(response => response.json())
                .then(data => console.log(data))
        }
    },
   
}

</script>

<style scoped>
.editor {
    display: flex;
    font-weight: lighter;
    
    width: 80%;
}


.botao__salvar {
    margin-top: 1.5rem;
    width: 100%;
}

.titulo {
    margin-bottom: 1rem;
}

.projeto__editor {
    width: 100%;
    margin-right: 3rem;
}

.descricao {
    margin-bottom: 2rem;
}

.projeto__info {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 30%;
    letter-spacing: 0.35rem;
}

.personalizacao {
    width: 100%;
}

</style>