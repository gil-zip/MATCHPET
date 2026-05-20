import { useState } from "react";

// Importando os componentes de dentro da pasta 'pages'
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";

// Importando a imagem da patinha de dentro da pasta 'imgs'
import iconePatinha from "./imgs/paw.png";

// Importando o CSS global (que cuida do layout de tela dividida)
import "./App.css";

function App() {
  // Estado que define qual aba/formulário está ativo: 'cadastrar' ou 'entrar'
  const [abaAtiva, setAbaAtiva] = useState("cadastrar");

  return (
    <div className="container">
      {/* LADO ESQUERDO (Fixo com a imagem de fundo pelo CSS) */}
      <div className="lado-esq">
        <div className="content">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src={iconePatinha} alt="Patinha" />
          </h1>
          <div className="logo"></div>
        </div>
      </div>

      {/* LADO DIREITO (Conteúdo Dinâmico) */}
      <div className="lado-dir">
        <div className="content">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src={iconePatinha} alt="Patinha" />
          </h1>

          <hr />

          {/* Abas de Navegação */}
          <div className="links">
            <a
              href="#entrar"
              className={abaAtiva === "entrar" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setAbaAtiva("entrar");
              }}
            >
              Entrar
            </a>
            <a
              href="#cadastrar"
              className={abaAtiva === "cadastrar" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setAbaAtiva("cadastrar");
              }}
            >
              Cadastrar
            </a>
          </div>

          {/* O React renderiza o componente correto baseado no estado 'abaAtiva' */}
          {abaAtiva === "entrar" ? <Login /> : <Cadastro />}
        </div>
      </div>
    </div>
  );
}

export default App;
