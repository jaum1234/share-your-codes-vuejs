<template>
    <form @submit.prevent="enviar" class="editor">
        <div class="projeto__editor">
            <Editor @codigo-atualizado="getCodigo" height="350px" :savedCode="form.codigo" :borderColor="form.cor" :isActive="active"/>
            <small style="color: red">{{ errors.codigo }}</small>
            <div class="botao__highlight">
                <Botao @click="highlight" tipo="button" corLabel="white" background="#0B254A" label="Visualizar com highlight" />
            </div>
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <small style="color: red">{{ errors.nome }}</small>
                <input type="text" placeholder="Nome do projeto" v-model="form.nome">

                <small style="color: red">{{ errors.descricao }}</small>
                <textarea placeholder="Descricao do projeto" v-model="form.descricao"></textarea>
            </div>
            <div class="info personalizacao">
                <h3 class="titulo personalizacao__titulo">PERSONALIZAÇAO</h3>
                <input type="color" v-model="form.cor">
            </div>
            <div class="botao__atualizar" v-if="id">
                <Botao background="#5081FB" label="Atualizar projeto"/>
            </div>
            <div class="botao__salvar" v-else>
                <Botao background="#5081FB" label="Salvar projeto"/>
            </div>
        </div>
    </form> 
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';
import Botao from '../../components/shared/Botao/Botao.vue';

import { projectHttp } from '../../domain/Http/Controllers/ProjectController';
import { validator } from '../../domain/Service/Validator';

export default {
    data() {
        return {
            id: this.$route.params.id,
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
    },
    mounted() {
        if (this.id) {
            projectHttp.show(this.id)
                .then(res => {
                    this.form = res.data.projeto[0];
                });
        }
    }, 
    methods: {
        getCodigo(codigo) {
            this.form.codigo = codigo;
        },
        highlight() {
            this.active = !this.active;
        },
        enviar() {
            
            if (this.id) {
                this.atualizar();
                return;
            }

            this.salvar();
        },
        atualizar() {
            this.$store.dispatch('projectsModule/update', { data: this.form, id: this.id })
                .then(res => {
                    if (res.success) {
                        this.$swal({
                            title: 'Projeto atualizado com sucesso!',
                            icon: 'success'
                        });
                        return;
                    }

                    validator.validate(this.errors, res.data.erros);
                    
                })
               
        },
        salvar() {
            this.$store.dispatch('projectsModule/store', this.form)
                .then(res => {
                    if (res.success) {
                        this.$swal({
                            title: 'Projeto salvo com sucesso!',
                            icon: 'success'
                        });
                        return;
                    }
                    validator.validate(this.errors, res.data.erros);
                })
        }, 
        
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

.botao__atualizar {
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