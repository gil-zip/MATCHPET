import React, { useState } from "react";
import "./Cadastro.css";

export default function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState("ong_protetor");
  const [subtipo, setSubtipo] = useState("ong");

  const handleCadastroSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="forms-cadastro" onSubmit={handleCadastroSubmit}>
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
            <span>ONG ou Protetor</span>
          </label>
        </div>
      </div>

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
            <span>Protetor Independente</span>
          </label>
        </div>
      )}

      <div className="input-container">
        <input type="text" className="input-field" placeholder="Nome:" />
      </div>

      <div className="form-row">
        {tipoUsuario === "ong_protetor" && (
          <div className="input-container">
            <input
              type="text"
              className={`input-field ${subtipo === "protetor" ? "disabled-field" : ""}`}
              placeholder="CNPJ: __.___.___/____-__"
              disabled={subtipo === "protetor"}
            />
          </div>
        )}

        <div className="input-container">
          <input
            type="text"
            className={`input-field ${tipoUsuario === "ong_protetor" && subtipo === "ong" ? "disabled-field" : ""}`}
            placeholder="CPF: ___.___.___-__"
            disabled={tipoUsuario === "ong_protetor" && subtipo === "ong"}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Telefone: (__) _____-____"
          />
        </div>
        <div className="input-container">
          <input type="email" className="input-field" placeholder="E-mail:" />
        </div>
      </div>

      <div className="input-container">
        <input type="password" className="input-field" placeholder="Senha:" />
      </div>
      <div className="input-container">
        <input
          type="password"
          className="input-field"
          placeholder="Confirme a senha:"
        />
      </div>

      <button type="submit" className="btn-enviar">
        Cadastrar
      </button>
    </form>
  );
}
