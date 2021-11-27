<template>
    <div class="editor">
        <div class="projeto__editor">
            <Editor/>
        </div>
        <div class="projeto__info">
            <div class="info descricao">
                <h3 class="titulo descricao__titulo">SEU PROJETO</h3>
                <input type="text" class="nome descricao__nome">
                <textarea name="" id="" cols="30" rows="10" class="descricao__descricao"></textarea>
            </div>
            <div class="info personalizaçao">
                <h3 class="titulo personalizacao__titulo">PERSONALIZAÇAO</h3>
                <input type="color" class="cor personalizacao__cor">
            </div>
        </div>
    </div>    
</template>

<script>
import Editor from '../../components/shared/Editor/Editor.vue';

export default {
    components: {
        Editor
    }    
}
</script>

<style scoped>
.editor {
    display: flex;
    font-weight: lighter;
    letter-spacing: 0.35rem;
    width: 80%;
}

.titulo {
    margin-bottom: 1rem;
}

.projeto__editor {
    width: 80%;
    margin-right: 3rem;
}

.projeto__textarea {
    
    
}

.projeto__info {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 30%;
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




</style>