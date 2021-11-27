<template>
    <div class="editor">
        <div class="projeto__editor">
            <Editor height="350px" :borderColor="cor"/>
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <input placeholder="Nome do seu projeto" type="text" class="nome descricao__nome">
                <textarea placeholder="Descriçao do seu projeto" cols="30" rows="10" class="descricao__descricao"></textarea>
            </div>
            <div class="info personalizacao">
                <h3 class="titulo personalizacao__titulo">PERSONALIZAÇAO</h3>
                <input v-model="cor" type="color" class="cor personalizacao__cor" >
            </div>
        </div>
    </div>    
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';

export default {
    data() {
        return {
            cor: '#6bd1ff'
        }
    },
    components: {
        Editor
    }    
}
</script>

<style scoped>
.editor {
    display: flex;
    font-weight: lighter;
    
    width: 80%;
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
    height: 60px;
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