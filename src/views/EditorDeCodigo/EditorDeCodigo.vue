<template>
    <form @submit.prevent="salvar" class="editor">
        <div class="projeto__editor">
            <Editor @codigo-atualizado="getCodigo" height="350px" :borderColor="form.cor" :isActive="active"/>
            <small style="color: red">{{ errors.codigo }}</small>
            <Botao @click="highlight" tipo="button" corLabel="white" background="#0B254A" label="Visualizar com highlight" />
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <small style="color: red">{{ errors.nome }}</small>
                <Input @value="getNome" tipo="text" placeholder="Nome do projeto" v-model="form.nome"/>
                <small style="color: red">{{ errors.descricao }}</small>
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
import ProjectRequests from '../../domain/Http/ProjectRequests.js';
import Botao from '../../components/shared/Botao/Botao.vue';
import Input from '../../components/shared/Form/Input.vue';
import Textarea from '../../components/shared/Form/Textarea.vue';
import ColorInput from '../../components/shared/Form/ColorInput.vue';

const http = new ProjectRequests();

export default {
    data() {
        return {
            form: {
                codigo: '',
                nome: '',
                descricao: '',
                cor: '#6BD1FF',
            },
            errors: {
                codigo: '',
                nome: '',
                descricao: '',
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
            console.log(this.form.cor)
            this.active = !this.active;

        },
        getCodigo(codigo) {
            this.form.codigo = codigo;
        },
        getColor(color) {
            this.form.cor = color;
        },
        getNome(nome) {
            this.form.nome = nome;
        },
        getDescricao(descricao) {
            this.form.descricao = descricao;
        },
        salvar() {
            http.store(this.form)
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        this.successAlert();
                        return;
                    }
                    this.errors.nome = data.erros.nome[0];
                    this.errors.descricao = data.erros.descricao[0];
                    this.errors.codigo = data.erros.codigo[0];

                    setTimeout(() => {
                        this.errors.nome = '';
                        this.errors.descricao = '';
                        this.errors.codigo = '';
                    }, 3000);
                });
        },
        successAlert() {
            this.$swal({
                title: 'Projeto salvo com sucesso!',
                icon: 'success'
            });
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

small {
    letter-spacing: 0;
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