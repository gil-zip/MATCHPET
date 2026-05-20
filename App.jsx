import "./App.css";
import { useState } from "react";

function App() {
  // Estado para controlar qual aba está ativa: 'entrar' ou 'cadastrar'
  const [abaAtiva, setAbaAtiva] = useState("cadastrar");

  // Estados do formulário de CADASTRO
  const [tipoUsuario, setTipoUsuario] = useState("ong_protetor"); // 'adotante' ou 'ong_protetor'
  const [subtipo, setSubtipo] = useState("ong"); // 'ong' ou 'protetor'

  // Handlers para envio dos formulários
  const handleCadastroSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário de Cadastro enviado.");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário de Login enviado.");
  };

  return (
    <div className="container">
      {/* LADO ESQUERDO (Fixo e imutável) */}
      <div className="lado-esq">
        <div className="content">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src="imgs/paw.png" alt="Patinha" />
          </h1>
          <div className="logo"></div>
        </div>
      </div>

      {/* LADO DIREITO (Dinâmico) */}
      <div className="lado-dir">
        <div className="content">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src="imgs/paw.png" alt="Patinha" />
          </h1>

          <hr />

          {/* Abas de Navegação alternando o estado do React */}
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

          {/* RENDEREZAÇÃO CONDICIONAL: FORMULÁRIO DE ENTRAR */}
          {abaAtiva === "entrar" && (
            <form className="forms" onSubmit={handleLoginSubmit}>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="E-mail:"
                  required
                />
              </div>

              <div className="input-container">
                <input
                  type="password"
                  name="senha"
                  className="input"
                  placeholder="Senha:"
                  required
                />
              </div>

              <button type="submit" className="btn-cadastrar">
                Entrar
              </button>
            </form>
          )}

          {/* RENDEREZAÇÃO CONDICIONAL: FORMULÁRIO DE CADASTRAR */}
          {abaAtiva === "cadastrar" && (
            <form className="forms" onSubmit={handleCadastroSubmit}>
              {/* Grupo de Rádio Principal */}
              <div className="radio-group-main">
                <span className="radio-label">Você é um(a):</span>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="tipo_usuario"
                      value="adotante"
                      checked={tipoUsuario === "adotante"}
                      onChange={(e) => setTipoUsuario(e.target.value)}
                    />
                    <span>Adotante</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tipo_usuario"
                      value="ong_protetor"
                      checked={tipoUsuario === "ong_protetor"}
                      onChange={(e) => setTipoUsuario(e.target.value)}
                    />
                    <span>ONG/Protetor</span>
                  </label>
                </div>
              </div>

              {/* Campo de Nome */}
              <div className="input-container">
                <input
                  type="text"
                  name="nome"
                  className="input"
                  placeholder="Nome:"
                />
              </div>

              {/* Subtipo ONG/Protetor dinâmico */}
              {tipoUsuario === "ong_protetor" && (
                <div className="radio-group-sub">
                  <label>
                    <input
                      type="radio"
                      name="subtipo"
                      value="ong"
                      checked={subtipo === "ong"}
                      onChange={(e) => setSubtipo(e.target.value)}
                    />
                    <span>ONG</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="subtipo"
                      value="protetor"
                      checked={subtipo === "protetor"}
                      onChange={(e) => setSubtipo(e.target.value)}
                    />
                    <span>Protetor</span>
                  </label>
                </div>
              )}

              {/* Linha de Documentos Dinâmica */}
              <div className="form-row">
                {tipoUsuario === "ong_protetor" && (
                  <div className="input-container">
                    <input
                      type="text"
                      name="cnpj"
                      className={`input ${subtipo === "protetor" ? "disabled-field" : ""}`}
                      placeholder="CNPJ: __.___.___/____-__"
                      disabled={subtipo === "protetor"}
                    />
                  </div>
                )}

                <div className="input-container">
                  <input
                    type="text"
                    name="cpf"
                    className={`input ${tipoUsuario === "ong_protetor" && subtipo === "ong" ? "disabled-field" : ""}`}
                    placeholder="CPF: ___.___.___-__"
                    disabled={
                      tipoUsuario === "ong_protetor" && subtipo === "ong"
                    }
                  />
                </div>
              </div>

              {/* Linha Telefone e E-mail */}
              <div className="form-row">
                <div className="input-container">
                  <input
                    type="text"
                    name="telefone"
                    className="input"
                    placeholder="Telefone: (__) _____-____"
                  />
                </div>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="E-mail:"
                  />
                </div>
              </div>

              {/* Campos de Senha */}
              <div className="input-container">
                <input
                  type="password"
                  name="senha"
                  className="input"
                  placeholder="Senha:"
                />
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="confirme_senha"
                  className="input"
                  placeholder="Confirme a senha:"
                />
              </div>

              {/* Botão Cadastrar */}
              <button type="submit" className="btn-cadastrar">
                Cadastrar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
