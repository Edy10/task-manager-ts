# Task Manager

Aplicação full stack para gerenciamento de tarefas, desenvolvida com React, Node.js, TypeScript e PostgreSQL.

O projeto foi criado com foco em aprendizado prático de desenvolvimento full stack, autenticação JWT, integração entre frontend e backend, organização em camadas e boas práticas de versionamento.

---

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT
- bcrypt
- CORS
- dotenv

---

## Funcionalidades

### Usuários

- Cadastro de usuário
- Login
- Autenticação com JWT
- Consulta do perfil do usuário autenticado
- Logout
- Proteção de rotas

### Tarefas

- Criar tarefa
- Listar tarefas
- Editar tarefa
- Excluir tarefa
- Definir status
- Definir prazo
- Associar tarefas ao usuário autenticado

---

## Status das tarefas

As tarefas podem possuir os seguintes status:

- `pendente`
- `em_andamento`
- `concluida`

Na interface, esses valores são apresentados de forma amigável:

```text
pendente       → Pendente
em_andamento   → Em andamento
concluida      → Concluída

---

## Estrutura do projeto

```text
task-manager-ts/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── db.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md