import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./AlterarPerfil.css";
import api from "../api/api";

export default function AlterarPerfil() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <main className="main-content edit-profile-content">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />

      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <h1 className="page-title">Alterar Perfil</h1>

      <form className="profile-form">
        <div className="animal-row">
          <div className="animal-col">
            <input
              type="text"
              name="nome"
              placeholder="Nome:"
              className="animal-input-field"
            />
          </div>
        </div>

        <div className="animal-row">
          <div className="animal-col">
            <input
              type="text"
              name="cpf"
              placeholder="CPF: ___.___.___-__"
              className="animal-input-field"
            />
          </div>
          <div className="animal-col">
            <input
              type="text"
              name="nascimento"
              placeholder="Data de Nascimento: __/__/____"
              className="animal-input-field"
            />
          </div>
        </div>

        <div className="animal-row">
          <div className="animal-col">
            <input
              type="text"
              name="telefone"
              placeholder="Telefone: (__) ____-____"
              className="animal-input-field"
            />
          </div>
          <div className="animal-col">
            <input
              type="email"
              name="email"
              placeholder="E-mail:"
              className="animal-input-field"
            />
          </div>
        </div>

        <div className="animal-row">
          <div className="animal-col">
            <input
              type="password"
              name="senha"
              placeholder="Senha:"
              className="animal-input-field"
            />
          </div>
          <div className="animal-col">
            <input
              type="password"
              name="confirma-senha"
              placeholder="Confirme a senha:"
              className="animal-input-field"
            />
          </div>
        </div>

        <div className="animal-row">
          <div className="animal-col">
            <button type="button" className="btn-animal-action btn-cancelar">
              Cancelar
            </button>
          </div>
          <div className="animal-col">
            <button type="submit" className="btn-animal-action btn-salvar">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
