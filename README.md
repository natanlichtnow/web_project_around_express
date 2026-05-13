# Web Project Around Express

## Descrição

API RESTful construída com Node.js, Express e MongoDB para o projeto **Around the US**. Permite gerenciar usuários e cartões de fotos, incluindo criação, leitura, atualização e exclusão, além de curtidas nos cartões.

## Funcionalidades

- Listar e buscar usuários por ID
- Criar e atualizar perfis de usuário (nome, descrição, avatar)
- Listar, criar e deletar cartões de fotos
- Curtir e descurtir cartões
- Validação de dados em todas as rotas
- Tratamento de erros com status HTTP adequados (400, 404, 500)

## Tecnologias e Técnicas

- **Node.js** — ambiente de execução JavaScript no servidor
- **Express** — framework web para criação das rotas e middlewares
- **MongoDB** — banco de dados NoSQL para persistência dos dados
- **Mongoose** — ODM para modelagem e validação dos dados
- **ESLint (Airbnb)** — padronização de estilo de código
- **Nodemon** — reinicialização automática do servidor em desenvolvimento
- **ES6+** — arrow functions, destructuring, template literals, modules

## Estrutura do projeto

```
web_project_around_express/
├── controllers/
│   ├── cards.js
│   └── users.js
├── models/
│   ├── card.js
│   └── user.js
├── routes/
│   ├── cards.js
│   └── users.js
├── utils/
│   └── errors.js
├── .editorconfig
├── .eslintrc
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Como rodar

```bash
# Instalar dependências
npm install

# Iniciar em produção
npm run start

# Iniciar em desenvolvimento (com auto-reload)
npm run dev
```

> Certifique-se de ter o MongoDB rodando localmente em `mongodb://localhost:27017`

## Rotas disponíveis

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users` | Retorna todos os usuários |
| GET | `/users/:userId` | Retorna um usuário por ID |
| POST | `/users` | Cria um novo usuário |
| PATCH | `/users/me` | Atualiza perfil (nome e descrição) |
| PATCH | `/users/me/avatar` | Atualiza avatar |

### Cartões

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/cards` | Retorna todos os cartões |
| POST | `/cards` | Cria um novo cartão |
| DELETE | `/cards/:cardId` | Deleta um cartão por ID |
| PUT | `/cards/:cardId/likes` | Curte um cartão |
| DELETE | `/cards/:cardId/likes` | Remove curtida de um cartão |
