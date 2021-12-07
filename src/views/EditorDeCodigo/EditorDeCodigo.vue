<template>
    <form @submit.prevent="salvar" class="editor">
        <div class="projeto__editor">
            <Editor @codigo-atualizado="getCodigo" height="350px" :borderColor="form.cor" :isActive="active"/>
            <small style="color: red">{{ errors.codigo }}</small>
            <div class="botao__highlight">
                <Botao @click="highlight" tipo="button" corLabel="white" background="#0B254A" label="Visualizar com highlight" />
            </div>
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <small style="color: red">{{ errors.nome }}</small>
                <div><Input @value="getNome" tipo="text" placeholder="Nome do projeto" v-model="form.nome"/></div>
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
import { projectHttp } from '../../domain/Http/ProjectRequests.js';
import { validator } from '../../domain/Errors/ValidationErrors.js';
import Botao from '../../components/shared/Botao/Botao.vue';
import Input from '../../components/shared/Form/Input.vue';
import Textarea from '../../components/shared/Form/Textarea.vue';
import ColorInput from '../../components/shared/Form/ColorInput.vue';

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
            projectHttp.store(this.form)
                .then(response => response.json())
                .then(data => {
                    if (data.success === true) {
                        this.successAlert();
                        return;
                    }
                    
                    validator.validate(this.errors, data.erros);

                    //const componentErrorKeys = Object.keys(this.errors);
                    //const responseErrorKeys = Object.keys(data.erros);
                    //
                    //componentErrorKeys.forEach(componentError => {
                    //    responseErrorKeys.forEach(responseError => {
                    //        if (componentError == responseError) {
                    //            this.errors[componentError] = data.erros[responseError][0];
                    //        }
                    //    });
                    //});

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

.botao__highlight {
    margin-top: 2rem;
}

.botao__salvar {
    margin-top: 1.5rem;
    width: 100%;
}

.titulo {
    margin-bottom: 1rem;
}

.projeto__editor {
    width: 75%;
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
    width: 20%;
    letter-spacing: 0.35rem;
}

.personalizacao {
    width: 100%;
}
    @media screen and (max-width: 1280px) {
        .editor {
            flex-direction: column;
            width: 100%;
        }

        .botao__highlight {
            margin-bottom: 3rem;
        }

        .botao__salvar {
            margin-bottom: 2rem;
        }

        .info {
            width: 100%;
        }

        .projeto__info {
            width: 100%;
        }

        .projeto__editor  {
            width: 100% !important;
            margin: 0;
        }
    }

</style>