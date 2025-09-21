# 📋 To-Do List 2.0

Este é um projeto de uma aplicação de lista de tarefas (To-Do List) desenvolvida com Next.js. A aplicação permite que usuários se cadastrem, façam login e gerenciem suas próprias tarefas de forma segura e organizada.

## ✨ Funcionalidades

- **Autenticação de Usuários**: Sistema completo de registro e login com senhas criptografadas e autenticação baseada em JWT (JSON Web Tokens).
- **Gerenciamento de Tarefas (CRUD)**:
  - Criar novas tarefas.
  - Listar todas as tarefas do usuário logado.
  - Marcar tarefas como concluídas/não concluídas.
  - Deletar tarefas.
- **Interface Moderna**: Interface de usuário limpa e responsiva, construída com Tailwind CSS.
- **Segurança**: Rotas de API protegidas para garantir que cada usuário só possa acessar e gerenciar suas próprias tarefas.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Framework**: Next.js
- **Banco de Dados**: PostgreSQL (hospedado no Supabase)
- **ORM**: Prisma
- **Estilização**: Tailwind CSS
- **Autenticação**: JWT (JSON Web Tokens) e bcrypt
- **Cliente HTTP**: Axios
- **Ambiente de Execução**: Node.js

## ⚙️ Configuração do Ambiente

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos

- Node.js (versão 18.18.0 ou superior)
- npm (geralmente instalado junto com o Node.js)

### 1. Configuração do Banco de Dados (Supabase)

O projeto utiliza um banco de dados PostgreSQL hospedado no Supabase.

1.  Crie uma conta gratuita no Supabase.
2.  Crie um novo projeto.
3.  No painel do seu projeto, navegue até **Project Settings** > **Database**.
4.  Na seção **Connection string**, copie a URI que se parece com `postgresql://postgres:[YOUR-PASSWORD]@[...].supabase.co:5432/postgres`. Esta será a sua `DATABASE_URL`.

### 2. Variáveis de Ambiente

1.  Na raiz do projeto, crie um arquivo chamado `.env`.
2.  Adicione as seguintes variáveis a este arquivo, substituindo os valores pelos seus:

    ```env
    # Cole a URI do seu banco de dados Supabase aqui
    DATABASE_URL="postgresql://postgres:[SUA-SENHA]@[SEU-HOST].supabase.co:5432/postgres"

    # Crie uma chave secreta longa e aleatória para assinar os tokens JWT
    JWT_SECRET="SUA_CHAVE_SECRETA_SUPER_SEGURA"
    ```

    > **Dica**: Você pode gerar uma chave secreta segura para `JWT_SECRET` executando o seguinte comando no seu terminal:
    > `openssl rand -base64 32`

## 🏃‍♂️ Rodando o Projeto

Com o ambiente configurado, siga os passos abaixo para executar a aplicação:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute as migrações do banco de dados:**
    Este comando irá ler o `schema.prisma` e criar as tabelas `User` e `Task` no seu banco de dados Supabase.
    ```bash
    npx prisma migrate dev
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em http://localhost:3000.