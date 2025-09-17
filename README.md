# API de Gerenciamento de Estoque

![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Uma API RESTful completa para gerenciamento de estoque, construída com NestJS, TypeORM e PostgreSQL. A aplicação é totalmente containerizada com Docker para um ambiente de desenvolvimento consistente e inclui um sistema de autenticação e autorização robusto baseado em papéis (Roles) com JWT.

## ✨ Features

- **CRUD Completo para Produtos:** Crie, leia, atualize e delete produtos.
- **Gerenciamento de Usuários:** Sistema de registro e gerenciamento de usuários.
- **Autenticação baseada em Token:** Login seguro com JSON Web Tokens (JWT).
- **Controle de Acesso Baseado em Papéis (RBAC):**
  - **Admins:** Acesso total ao CRUD de produtos e usuários.
  - **Users:** Acesso somente para visualização de produtos.
- **Validação de Dados:** Validação de entrada em todas as rotas de criação e atualização.
- **Ambiente Dockerizado:** Configuração completa com `docker-compose` para rodar a API e o banco de dados PostgreSQL localmente.
- **Segurança:** Uso de `helmet` para proteção contra vulnerabilidades web comuns e `bcrypt` para hashing de senhas.

## 🚀 Live Demo

A aplicação está implantada no Render:

* **Frontend:** [https://my-stock-api-site.onrender.com](https://my-stock-api-site.onrender.com)
* **API (Base URL):** [https://my-stock-api.onrender.com](https://my-stock-api-2xg6.onrender.com)

## 🛠️ Tecnologias Utilizadas

- **Backend:** NestJS, TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM
- **Autenticação:** Passport.js (Estratégias `local` e `jwt`)
- **Containerização:** Docker, Docker Compose
- **Validação:** `class-validator`, `class-transformer`
- **Segurança:** `bcrypt` (hashing de senha), `helmet`

## ⚙️ Rodando Localmente (Passo a Passo)

Para rodar este projeto no seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gacneto/stock-api.git](https://github.com/gacneto/stock-api.git)
    cd stock-api
    ```

2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    O projeto utiliza um arquivo `.env` para gerenciar as variáveis de ambiente.
    * Crie uma cópia do arquivo de exemplo:
        ```bash
        cp .env.example .env
        ```
        *(Se o arquivo `.env.example` não existir, crie-o e também o `.env` com o conteúdo abaixo).*

    * Seu arquivo `.env` deve ter a seguinte estrutura:
        ```env
        # URL de conexão para o banco de dados PostgreSQL no Docker
        DATABASE_URL=postgresql://postgres:password@localhost:5432/estoque_db

        # Chave secreta para assinar os tokens JWT. Use um valor longo e aleatório.
        JWT_SECRET=SEU_SEGREDO_SUPER_SECRETO_E_LONGO_AQUI
        ```

4.  **Inicie o Banco de Dados com Docker:**
    Certifique-se de que o Docker Desktop está em execução.
    ```bash
    docker-compose up -d
    ```
    Este comando irá iniciar um container PostgreSQL em segundo plano.

5.  **Inicie a Aplicação NestJS:**
    ```bash
    npm run start:dev
    ```

Sua API estará rodando em `http://localhost:3000`.

## Endpoints da API

A seguir, a documentação das rotas disponíveis na API.

| Método HTTP | Endpoint           | Descrição                             | Acesso     |
| :---------- | :----------------- | :------------------------------------ | :--------- |
| `POST`      | `/user`            | Registra um novo usuário.             | Público    |
| `GET`       | `/user`            | Lista todos os usuários.              | Admin      |
| `DELETE`    | `/user/:id`        | Deleta um usuário específico.         | Admin      |
| `POST`      | `/auth/login`      | Realiza o login e retorna um token JWT. | Público    |
| `GET`       | `/products`        | Lista todos os produtos.              | Público    |
| `GET`       | `/products/:id`    | Busca um produto específico por ID.   | Público    |
| `POST`      | `/products`        | Cria um novo produto.                 | Admin      |
| `PATCH`     | `/products/:id`    | Atualiza um produto existente.        | Admin      |
| `DELETE`    | `/products/:id`    | Deleta um produto.                    | Admin      |

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
