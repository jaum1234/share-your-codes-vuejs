# VueJS Interface - Share Your Codes

## Consumindo a [API](https://github.com/jaum1234/editor-de-codigo)
Apesar dos pacotes já existentes, optei por consumir a API utilizando a api [Fetch](https://github.com/jaum1234/editor-de-codigo) do Javascript. 

Cada recurso possui seu próprio "controller" responsável por enviar e ler dados da API quando requisitados.

## Validaçao e compartilhamento
Novamente, optei por nao utilizar nenhum pacote e implementar minhas próprias classes.

Foram criadas duas classes de serviço. Uma contem a lógica necessária para compartilhamento dos projetos na redes sociais, restritas, até o momento, ao twitter e Wpp Web. A outra é responsável por receber os erros de validaçao enviados na resposta da requisiçao e exibi-los na tela para o usuário.

## Token
Até o momento, o token do usuário está sendo armazenado em cookies. Para facilitar essa tarefa, foi utilizado o pacote [js-cookie](https://github.com/js-cookie/js-cookie).

## Principais pacotes utilizados
- [SweetAlert](https://sweetalert2.github.io/#examples)
- [Fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome)
- [HighlightJS](https://www.npmjs.com/package/vue-highlightjs)



