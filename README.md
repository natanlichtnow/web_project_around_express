# Web Project Around Express

## Descrição
API simples construída com Express que fornece dados de usuários e cartões a partir de arquivos JSON locais.

## Funcionalidades
- Listar todos os usuários
- Buscar usuário por ID
- Listar todos os cartões
- Tratamento de erros 404 e 500

## Tecnologias
- Node.js
- Express
- ESLint (Airbnb)
- Nodemon

## Como rodar
```bash
npm install
npm run dev
```

## Rotas
- GET /users
- GET /users/:id
- GET /cards
- GET /card (redirect)
