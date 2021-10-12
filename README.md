###`Projeto FrontEnd que traz uma simplificação de tela para seleção de lanches em uma hamburgueria. O sistema faz requisições ao backend e renderiza na tela 2 listagens: ###Ingredientes e um cárdapio de lanches.`

O usuário pode: 

1- Montar um lanche personalizado. Nessa modalidade, o usuário seleciona os ingredientes para montar seu lanche. O sistema faz requisições ao backend para que o total do lanche seja calculado. Dependendo da seleção de ingredientes e suas quantidades, promoções são aplicadas;

2- Realizar uma seleção de um lanche já montado. A listagem é exibida já com o preço do lanche calculado, baseado no valor individual de cada ingrediente.

###Para o desenvolvimento do projeto, foi utilizado Javascript com framework React e para o esilização o Bulma. A opção pelo framework foi pela simplicidade que ele oferece para a ###montagem de tela com componentes e atualização de elementos.
  -O projeto conta com 3 componentes: App, Ingredientes e Cardapio.
  -Os acessos a api são realizadas através de 3 services: CardapioService, IngredientesService e LanchePersonalizadoService.
  -Os acessos foram desenvolvido com a ajuda do pacote axios.

Para rodar o projeto, no diretório do mesmo basta utilizar o comando 
### `yarn start`

No browse basta acessar o endereço http://localhost:3000

