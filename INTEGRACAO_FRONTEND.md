# 🌐 Guia de Integração MatchPet (Backend -> Frontend)

Este documento serve para orientar o desenvolvedor Frontend sobre como consumir as APIs do sistema MatchPet.

## 📍 Informações Gerais
- **Base URL**: `http://localhost:8080`
- **Formato de dados**: JSON
- **CORS**: Habilitado para todas as origens (`*`)

---

## 🔑 Autenticação e Usuários

### Login
- **URL**: `/api/auth/login`
- **Método**: `POST`
- **Corpo (Body)**:
  ```json
  {
    "email": "usuario@email.com",
    "senha": "123"
  }
  ```

### Cadastro de Adotante
- **URL**: `/api/usuarios/adotante`
- **Método**: `POST`
- **Corpo (Body)**: Inclui objeto `endereco` aninhado.

### Cadastro de ONG ou Protetor
- **URL**: `/api/usuarios/ong`
- **Método**: `POST`
- **Dica**: Use o campo `tp_cadastro` como `"ONG"` ou `"PROTETOR"`.

---

## 🐾 Gerenciamento de Animais

### Listar Animais Disponíveis
- **URL**: `/api/animais/disponiveis`
- **Método**: `GET`
- **Filtros Opcionais**: `?especie=Cachorro&porte=Grande`

### Cadastrar Novo Animal
- **URL**: `/api/animais`
- **Método**: `POST`
- **Corpo**:
  ```json
  {
    "nome": "Rex",
    "especie": "Cachorro",
    "raca": "Vira-lata",
    "idade": 2,
    "porte": "Médio",
    "especificidades": "Muito dócil",
    "ong": { "id_ong": 1 }
  }
  ```

---

## 💡 Exemplo Prático no React (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Função para buscar animais
export const getAnimais = async () => {
  try {
    const response = await api.get('/animais/disponiveis');
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar animais", error);
  }
};
```

---

## 🛠 Ferramentas Recomendadas
- **Postman** ou **Insomnia**: Para testar as rotas sem precisar do React.
- **Console do Navegador**: Verifique a aba "Network" (Rede) para ver os erros de requisição.
