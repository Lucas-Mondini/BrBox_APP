# BRBOX_APP API!

- API a qual alimenta o aplicativo BRBOX.
- Completamente independente do front
- Escrita em Typescript com NodeJS


## Arquitetura geral
A arquitetura da API é baseada em MVC; contendo serviços e middlewares tambem.

- Todas as configurações basicas de banco de dados, chave de token e outras estarão no arquivo .env
- O ponto de partida da aplicação é o src/app.ts
- O inicio da API segue a pipeline de:
	 1.  Fazer a conexão ao banco de dados
	 2.  Carregar as configurações padrões da API
	 3.  Aplicar configurações de roteador (express), incluindo: cors e configurações de tipo de retorno (padrão JSON)
	 4.  Carregar rotas*
	 5.  Abrir o servidor na porta padrão (padrão 8080 em desenvolvimento, mas pode ser configurado no .env)

- Em sua primeira inicialização, irá criar o usuario Administrador padrão; podendo ser configurado pelo arquivo .env

### Carregamento de rotas

O carregamento das rotas se inicia em "app.use(mainRouter)" no ponto de partida da API (src/app.ts)
- Carrega-se o router principal e a partir dele, carregam-se os proximos 

### Views

- A partir de cada router, este chamará a respectiva view; a qual se encarrega de dar o retorno para o front.
- Fica a cargo de cada router definir a view que será chamada
- As views não ficam encarregadas de forma alguma de regras de negocio; apenas, se necessario, de formatação de valores para o retorno
- As regras de negocio ficam nos controllers, então as views, chamarão os controllers


### Controllers

- Apos a passagem pela view, esta irá chamar o controller para a regra de negocio, passando os valores da request
- O controller será responsavel pela regra de negocio

### Model
- O model é puramente a entidade do objeto, isto é, a instancia do objeto no banco de dados e na linguagem de programação