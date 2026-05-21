import React, { useState } from "react";
import "./Cadastro.css";

export default function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState("ong_protetor");
  const [subtipo, setSubtipo] = useState("ong");

  const [usuario, setUsuario] = useState({
    nome: "",
    cpf: "",
    cnpj: "",
    tel: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleCadastroSubmit = (e) => {
    e.preventDefault();

    const dadosFinaisCadastro = {
      ...usuario,
      tipo: tipoUsuario,
      subtipo: tipoUsuario === "ong_protetor" ? subtipo : "nenhum",
    };

    console.log(
      "Objeto pronto para enviar ao Banco de Dados:",
      dadosFinaisCadastro,
    );
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
        <input
          type="text"
          name="nome"
          value={usuario.nome}
          className="input-field"
          placeholder="Nome:"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        {tipoUsuario === "ong_protetor" && (
          <div className="input-container">
            <input
              type="text"
              name="cnpj"
              value={usuario.cnpj}
              className={`input-field ${subtipo === "protetor" ? "disabled-field" : ""}`}
              placeholder="CNPJ: __.___.___/____-__"
              disabled={subtipo === "protetor"}
              onChange={handleChange}
              required={tipoUsuario === "ong_protetor" && subtipo === "ong"}
            />
          </div>
        )}

        <div className="input-container">
          <input
            type="text"
            name="cpf"
            value={usuario.cpf}
            className={`input-field ${tipoUsuario === "ong_protetor" && subtipo === "ong" ? "disabled-field" : ""}`}
            placeholder="CPF: ___.___.___-__"
            disabled={tipoUsuario === "ong_protetor" && subtipo === "ong"}
            onChange={handleChange}
            required={tipoUsuario === "adotante" || subtipo === "protetor"}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-container">
          <input
            type="text"
            name="tel"
            value={usuario.tel}
            className="input-field"
            placeholder="Telefone: (__) _____-____"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            value={usuario.email}
            className="input-field"
            placeholder="E-mail:"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="input-container">
        <input
          type="password"
          name="senha"
          value={usuario.senha}
          className="input-field"
          placeholder="Senha:"
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          className="input-field"
          placeholder="Confirme a senha:"
          required
        />
      </div>

      <button type="submit" className="btn-enviar">
        Cadastrar
      </button>
    </form>
  );
}
