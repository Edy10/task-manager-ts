# Task Manager

Aplicação full stack para gerenciamento de tarefas, desenvolvida com React, TypeScript, Node.js, Express e PostgreSQL.

O sistema possui autenticação com JWT, cadastro de usuários, controle de acesso e CRUD completo de tarefas.

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

## Funcionalidades

### Usuários

- Cadastro de usuário
- Login
- Logout
- Autenticação com JWT
- Consulta de perfil
- Proteção de rotas

### Tarefas

- Criar tarefa
- Listar tarefas
- Editar tarefa
- Excluir tarefa
- Definir status
- Definir prazo
- Vincular tarefas ao usuário autenticado

## Estrutura

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
│   └── package.json
│
└── README.md
```

## Como executar

### Pré-requisitos

Tenha instalado:

- Git
- Node.js
- npm
- PostgreSQL

### 1. Clone o repositório

```bash
git clone https://github.com/Edy10/task-manager-ts.git
cd task-manager-ts
```

### 2. Crie o banco de dados

No PostgreSQL:

```sql
CREATE DATABASE task_manager;
```

Conecte-se ao banco `task_manager` e crie as tabelas:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    prazo DATE,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);
```

### 3. Configure o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo:

```text
.env
```

com:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=sua_senha
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
```

Ajuste `DB_USER` e `DB_PASSWORD` conforme sua configuração local do PostgreSQL.

Inicie o backend:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

### 4. Configure o frontend

Abra outro terminal e, a partir da raiz do projeto:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

## Primeiro acesso

Acesse:

```text
http://localhost:5173
```

Crie um usuário pela opção de cadastro e, em seguida, faça login.

Após a autenticação, você terá acesso ao gerenciamento das tarefas.

## Rotas principais

### Frontend

```text
/login
/cadastro
/tarefas
```

### API

```text
POST   /usuarios
POST   /usuarios/login
GET    /usuarios/perfil

GET    /tarefas
POST   /tarefas
PUT    /tarefas/:id
DELETE /tarefas/:id
```

As rotas de tarefas exigem autenticação JWT.

## Arquitetura do backend

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

## Status das tarefas

```text
pendente
em_andamento
concluida
```

Na interface:

```text
Pendente
Em andamento
Concluída
```