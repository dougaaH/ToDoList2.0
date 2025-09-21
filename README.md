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

O projeto utiliza um banco de dados PostgreSQL. Para o ambiente de desenvolvimento e produção, recomendamos o [Supabase](https://supabase.com/) pela facilidade de configuração e pelo pool de conexões (PgBouncer).

1.  Crie uma conta gratuita no Supabase.
2.  Crie um novo projeto.
3.  No painel do seu projeto, navegue até **Project Settings** > **Database**.
4.  Você precisará de duas URLs de conexão:
    - **URL de Conexão Direta**: Na seção **Connection string**, copie a URI que usa a porta `5432`.
    - **URL com Pool de Conexões**: Na seção **Connection pooling**, copie a string de conexão que usa a porta `6543`.

### 2. Variáveis de Ambiente

1.  Na raiz do projeto, crie um arquivo chamado `.env`.
2.  Adicione as seguintes variáveis a este arquivo, substituindo os valores pelos seus:

    ```env
    # Para desenvolvimento, usamos a URL de conexão direta
    DATABASE_URL="postgresql://postgres:[SUA-SENHA]@[SEU-HOST].supabase.co:5432/postgres"

    # A URL direta também é necessária para o Prisma executar migrações
    DIRECT_URL="postgresql://postgres:[SUA-SENHA]@[SEU-HOST].supabase.co:5432/postgres"

    # Crie uma chave secreta longa e aleatória para assinar os tokens JWT.
    JWT_SECRET="SUA_CHAVE_SECRETA_SUPER_SEGURA"
    ```

    > **Dica**: Você pode gerar uma chave secreta segura para `JWT_SECRET` executando o seguinte comando no seu terminal:
    > `openssl rand -base64 32`

## 🏃‍♂️ Rodando o Projeto

Com o ambiente configurado, siga os passos abaixo para executar a aplicação:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/dougaaH/ToDoList2.0.git
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

## 🚀 Deploy (Vercel)

Este projeto está pronto para ser implantado na [Vercel](https://vercel.com/).

### 1. Importe o Projeto

1.  Após fazer o push do seu código para um repositório no GitHub, acesse seu painel da Vercel.
2.  Clique em "Add New..." > "Project".
3.  Importe o repositório do seu projeto. A Vercel detectará automaticamente que é um projeto Next.js e configurará os comandos de build (`npm run build`) e instalação (`npm install`).

### 2. Configure as Variáveis de Ambiente

Esta é a etapa mais importante. A aplicação precisa das chaves secretas para se conectar ao banco de dados e para a autenticação JWT.

1.  No painel do seu projeto na Vercel, vá para **Settings** > **Environment Variables**.
2.  Adicione as seguintes variáveis:

| Key            | Value                                           | Descrição                                                                                                                                |
| :------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` | `postgresql://...:6543/postgres?pgbouncer=true` | **URL com Pool de Conexões**. Vá ao seu projeto Supabase > Project Settings > Database > Connection pooling e copie a string de conexão. |
| `DIRECT_URL`   | `postgresql://...:5432/postgres`                | **URL de Conexão Direta**. Vá ao seu projeto Supabase > Project Settings > Database > Connection string e copie a URI.                   |
| `JWT_SECRET`   | `sua_chave_super_secreta`                       | A mesma chave que você usou no seu arquivo `.env` local.                                                                                 |

> **Atenção:** É crucial usar a URL com **PgBouncer** (`DATABASE_URL`) para a aplicação em produção para gerenciar o pool de conexões de forma eficiente em um ambiente serverless. A `DIRECT_URL` é usada pelo Prisma durante o processo de build para gerar o cliente.

### 3. Faça o Deploy

Após configurar as variáveis de ambiente, vá para a aba **Deployments** e acione um "Redeploy" para que as novas configurações sejam aplicadas.

Sua aplicação estará online e funcionando!
