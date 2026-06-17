# MatchPet Backend - Guia para Iniciantes 🐾

Este é o backend do projeto MatchPet, desenvolvido com **Java 17** e **Spring Boot**.

## 🚀 Como rodar o projeto localmente

1.  **Pré-requisitos**:
    *   Java 17 ou superior instalado.
    *   Maven instalado (ou use o wrapper `./mvnw`).
    *   MySQL rodando localmente (ou use os dados do Railway).

2.  **Configuração do Banco de Dados**:
    *   Abra o arquivo `src/main/resources/application.properties`.
    *   Substitua os valores de `spring.datasource.url`, `username` e `password` pelos seus dados do MySQL.

3.  **Execução**:
    *   No terminal, dentro da pasta `backend`, rode:
        ```bash
        # No Linux ou Mac:
        ./mvnw spring-boot:run

        # No Windows:
        mvnw.cmd spring-boot:run
        ```
    *   A API estará disponível em `http://localhost:8080`.

## 📂 Estrutura do Projeto (O que é cada pasta?)

*   **`model`**: Aqui definimos o formato dos dados. Cada classe é uma tabela no banco.
    *   `Animal.java`: Dados do pet (nome, raça, status).
    *   `ONG.java`: Dados da ONG ou Protetor.
    *   `Adotante.java`: Dados de quem quer adotar.
    *   `Endereco.java`: Dados de localização.
*   **`repository`**: São as "ferramentas de busca". O Spring usa isso para salvar e buscar dados no banco sem você precisar escrever SQL.
*   **`service`**: É onde fica a lógica. Se tivermos que validar um CPF ou calcular algo, fazemos aqui.
*   **`controller`**: São os "endereços" (URLs) que o seu Frontend React vai chamar.
    *   Ex: `POST /api/auth/login` para entrar no sistema.
*   **`dto`**: Objetos simples usados apenas para transferir dados entre o site e o servidor.

## 🛠 Principais Tecnologias

*   **Spring Data JPA**: Cuida de toda a parte de Banco de Dados.
*   **Lombok**: Evita que tenhamos que escrever milhares de `get/set` manualmente.
*   **Spring Web**: Permite criar as rotas da API.

## 📝 Próximos Passos Sugeridos

1.  **Segurança**: No futuro, adicionar `Spring Security` com `JWT` para que as senhas não viajem abertas e o login seja mais seguro.
2.  **Imagens**: Implementar o upload de fotos dos animais para o S3 ou Cloudinary.
3.  **Validações**: Adicionar validações de campo (ex: `@Email`, `@NotBlank`) nos modelos.

Dúvidas? Explore o código e tente entender como um `Controller` chama um `Service`, que por sua vez usa um `Repository`!
