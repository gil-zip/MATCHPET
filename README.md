# 🐾 MATCHPET

> **Conectando pessoas e animais para transformar a adoção em um encontro que faz sentido.**

O **MATCHPET** é uma plataforma web desenvolvida para facilitar o processo de **adoção responsável de animais**, conectando pessoas interessadas em adotar com **ONGs e protetores independentes**.

A proposta é centralizar informações sobre animais disponíveis para adoção e tornar a busca mais simples, organizada e acessível, aproximando potenciais adotantes dos animais que precisam de um novo lar.

---

## 🎯 Sobre o projeto

Encontrar um animal para adoção nem sempre é um processo simples. Informações podem estar espalhadas por diferentes redes sociais, sites e organizações, dificultando tanto a busca por parte dos adotantes quanto a divulgação dos animais por ONGs e protetores.

O **MATCHPET** surge como uma solução para centralizar esse processo em uma única plataforma.

A aplicação permite estruturar informações de **animais, adotantes, ONGs, protetores e endereços**, criando uma base para conectar quem deseja adotar com quem está buscando um lar para um animal.

---

## ✨ Funcionalidades

### 👤 Usuários

* Cadastro de adotantes;
* Cadastro de ONGs e protetores;
* Autenticação de usuários;
* Gerenciamento de informações pessoais;
* Cadastro de endereço.

### 🐶 Animais

* Cadastro de animais disponíveis para adoção;
* Consulta de animais;
* Filtragem por características;
* Informações como:

  * Nome;
  * Espécie;
  * Raça;
  * Idade;
  * Porte;
  * Características e especificidades;
  * Organização ou protetor responsável.

### 🔎 Busca

A plataforma permite consultar animais disponíveis e utilizar filtros para facilitar a localização de pets compatíveis com o interesse do adotante.

Exemplo:

```text
GET /api/animais/disponiveis?especie=Cachorro&porte=Grande
```

---

## 🏗️ Arquitetura

O projeto está organizado em uma arquitetura **full stack**, separando frontend e backend:

```text
MATCHPET
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── README.md
│
├── frontend/
│   ├── api/
│   ├── imgs/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── INTEGRACAO_FRONTEND.md
├── package.json
└── vite.config.js
```

O backend segue uma organização baseada em camadas, incluindo **Model, Repository, Service, Controller e DTO**, facilitando a separação de responsabilidades e a manutenção do código.

---

## 🛠️ Tecnologias

### Frontend

* **React**
* **Vite**
* **JavaScript**
* **React Router**
* **Axios**
* **Bootstrap**
* **React IMask**

O frontend utiliza React com Vite e possui serviços/API para comunicação com o backend.

### Backend

* **Java 17**
* **Spring Boot 3.2.5**
* **Spring Web**
* **Spring Data JPA**
* **Spring Validation**
* **MySQL**
* **H2**
* **Lombok**
* **Maven**

As dependências e versões podem ser consultadas no `pom.xml` do backend.

### Banco de dados

O backend utiliza **MySQL** como banco de dados principal e possui suporte ao **H2** para testes.

---

## 🔌 Comunicação entre Frontend e Backend

A aplicação utiliza uma API REST para realizar a comunicação entre as duas camadas.

Durante o desenvolvimento local, o backend utiliza:

```text
http://localhost:8080
```

As informações são transmitidas em formato **JSON** e o CORS está configurado para permitir requisições do frontend.

### Principais endpoints

#### 🔐 Autenticação

```http
POST /api/auth/login
```

#### 👤 Cadastro de adotante

```http
POST /api/usuarios/adotante
```

#### 🏢 Cadastro de ONG ou protetor

```http
POST /api/usuarios/ong
```

#### 🐾 Listagem de animais disponíveis

```http
GET /api/animais/disponiveis
```

#### 🐕 Cadastro de animal

```http
POST /api/animais
```

A documentação de integração atualmente disponível no projeto apresenta exemplos de requisições e utilização da API com Axios.

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, tenha instalado:

* **Java 17+**
* **Node.js**
* **npm**
* **MySQL**
* **Git**

---

### 1. Clone o repositório

```bash
git clone https://github.com/gil-zip/MATCHPET.git
```

Entre na pasta:

```bash
cd MATCHPET
```

---

## ⚙️ Executando o Backend

Entre na pasta:

```bash
cd backend
```

Configure as informações do banco de dados no arquivo:

```text
src/main/resources/application.properties
```

Informe as credenciais do seu MySQL.

Depois execute:

### Windows

```bash
mvnw.cmd spring-boot:run
```

### Linux/macOS

```bash
./mvnw spring-boot:run
```

O backend ficará disponível em:

```text
http://localhost:8080
```

O próprio projeto disponibiliza instruções específicas para execução do backend localmente.

---

## 💻 Executando o Frontend

Em outro terminal, volte para a raiz do projeto:

```bash
cd MATCHPET
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite disponibilizará a aplicação em um endereço local indicado no terminal.

Para gerar uma versão de produção:

```bash
npm run build
```

Para visualizar o build:

```bash
npm run preview
```

Esses scripts estão definidos no `package.json` do projeto.

---

## 🔄 Fluxo da aplicação

De maneira simplificada, o funcionamento da aplicação pode ser representado da seguinte forma:

```text
                    ┌─────────────────┐
                    │     Usuário     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Frontend     │
                    │ React + Vite    │
                    └────────┬────────┘
                             │
                         HTTP / JSON
                             │
                             ▼
                    ┌─────────────────┐
                    │     Backend     │
                    │ Spring Boot     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Spring Data JPA │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      MySQL      │
                    └─────────────────┘
```

---

## 📚 Estrutura do Backend

O backend utiliza uma arquitetura organizada em diferentes responsabilidades:

```text
backend/
└── src/main/java/
    └── ...
        ├── controller/
        ├── service/
        ├── repository/
        ├── model/
        └── dto/
```

### `model`

Representa as entidades utilizadas pela aplicação e persistidas no banco de dados.

Entre elas estão conceitos como:

* Animal;
* ONG;
* Adotante;
* Endereço.

### `repository`

Responsável pelo acesso aos dados utilizando **Spring Data JPA**.

### `service`

Concentra as regras de negócio da aplicação.

### `controller`

Define os endpoints REST utilizados pelo frontend.

### `dto`

Responsável pelos objetos utilizados na transferência de dados entre as diferentes camadas da aplicação.

Essa organização já está documentada no README específico do backend.

---

## 🧪 Testes

O backend possui suporte à infraestrutura de testes do Spring Boot e ao banco H2, permitindo a criação de testes sem depender necessariamente de uma instância MySQL.

Para executar os testes:

```bash
cd backend
mvnw.cmd test
```

No Linux/macOS:

```bash
./mvnw test
```
