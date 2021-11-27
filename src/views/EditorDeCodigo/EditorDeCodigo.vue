<template>
    <form @submit.prevent="salvar" class="editor">
        <div class="projeto__editor">
            <Editor @codigo-atualizado="getCodigo" height="350px" :borderColor="form.cor" :isActive="active"/>
            <button class="botao__editor" @click.prevent="highlight">Visualizar om highlight</button>
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <input v-model="form.nome" name="nome" placeholder="Nome do seu projeto" type="text" class="nome descricao__nome">
                <textarea v-model="form.descricao" name="descricao" placeholder="Descriçao do seu projeto" class="descricao__descricao"></textarea>
            </div>
            <div class="info personalizacao">
                <h3 class="titulo personalizacao__titulo">PERSONALIZAÇAO</h3>
                <input name="cor" v-model="form.cor" type="color" class="cor personalizacao__cor" >
            </div>
            <button type="submit" >Salvar projeto</button>
        </div>
    </form> 
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';
import HttpRequests from '../../domain/HttpRequests.js';

var http = new HttpRequests();

export default {
    data() {
        return {
            form: {
                codigo: '',
                nome: '',
                descricao: '',
                cor: '#6bd1ff',
            },
            active: false,
        }
    },
    components: {
        Editor
    },
    methods: {
        highlight() {
            this.active = !this.active;
            console.log(this.form.codigo);

        },
        getCodigo(codigo) {
            this.form.codigo = codigo;
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

.botao__editor {
    background: #0B254A;
    border-width: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    padding: 1.2rem;
    width: 100%;

}

.botao__salvar {
    background: #5081FB;
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


.nome {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}

.descricao__descricao {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    height: 100px;
    padding: 1rem;
    resize: none;
    width: 100%;
}

.personalizacao {
    width: 100%;
}

.personalizacao__cor {
    -webkit-appearance: none;
    border-radius: 5px;
    outline: none;
    width: 100%;
    height: 55px;
}

input[type="color"] {
	-webkit-appearance: none;
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