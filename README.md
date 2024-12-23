
# Controle de Serviços de Engenharia

Um aplicativo para gerenciar e otimizar o controle de serviços prestados por engenheiros. O objetivo é proporcionar uma solução eficiente para cadastrar, acompanhar e gerenciar serviços, pagamentos e clientes.

## Funcionalidades

- **Cadastro de Serviços**: Adicione e gerencie informações sobre serviços prestados.
- **Controle de Pagamentos**: Registre e monitore pagamentos recebidos e pendentes.
- **Histórico de Clientes**: Armazene detalhes e histórico de interações com clientes.
- **Relatórios Personalizados**: Gere relatórios para análise financeira e de desempenho.
- **Armazenamento de Documentos**: Guarde documentos relevantes relacionados aos serviços e clientes.

## Tecnologias Utilizadas

- **Frontend**: [React](https://react.dev/)
- **Backend**: [Node.js](https://nodejs.org/en/)
- **Banco de Dados**: [MongoDB](https://www.mongodb.com/pt-br)
- **Autenticação**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Versionamento de Código**: [Git](https://git-scm.com/)

## Instalação

### Pré-requisitos

- **Node.js**: Versão >= 14.x.x
- **MongoDB**: Servidor local ou hospedado

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/henriquecvieira/API-CadastroArt.git
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd API-CadastroArt
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```plaintext
   ENVIRONMENT="local"
   API_URL="localhost:3000"
   PORT="3000"

   DB_HOST_LOCAL="0.0.0.0"
   DB_USER_LOCAL="Secret_DB_User_password"
   DB_PASSWORD_LOCAL="Secret_DB_Password"
   DB_PORT_LOCAL="27017"
   DB_NAME="API-CadastroArt"
   DB_URI=your_database_url

   KEY_TOKEN_JWT="Insert_Key_Token_JWT_Secret"
   EXPIRES_IN="24h"
   APPLICATION_TOKEN="Insert_APPLICATION_TOKEN_Secret"
   ```

5. Inicie o servidor:

   ```bash
   npm start
   ```

6. Acesse o aplicativo em [http://localhost:3000](http://localhost:3000).

## Rotas da API

### Autenticação e Usuários

- **POST /v1/createUser**: Cria um novo usuário.
  - Headers: `Authorization: <APPLICATION_TOKEN>`
  - Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /v1/loginUser**: Realiza o login de um usuário.
  - Headers: `Authorization: <APPLICATION_TOKEN>`
  - Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **POST /v1/users/recover-password**: Solicita a recuperação de senha.
  - Headers: `Content-Type: application/json`
  - Body:
    ```json
    {
      "email": "string"
    }
    ```
  - Resposta:
    ```json
    {
      "message": "Um link de recuperação de senha foi enviado para o seu email."
    }
    ```

### Serviços

- **POST /v1/:id/service**: Adiciona um serviço para o usuário especificado pelo `id`.
  - Headers: `Authorization: <JWT_TOKEN>`
  - Body:
    ```json
    {
      "service_name": "string",
      "service_description": "string"
    }
    ```

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

[![Linkedin Badge](https://img.shields.io/badge/-Henrique-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/henriquecarvalhovieira/)](https://www.linkedin.com/in/henriquecarvalhovieira/)
[![Live mail Badge](https://img.shields.io/badge/-hnr01@live.com-5186e1?style=flat-square&logo=Outlook&logoColor=white&link=mailto:hnr01@live.com)](mailto:hnr01@live.com)

<h4 align="center"> ...Em construção 🚧 logo teremos mais conteúdos 🚀</h4>
```

