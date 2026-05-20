import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./CadAnimal.css";

export default function CadAnimal() {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <>
      <Navbar onOpenMenu={() => setMenuAberto(true)} />

      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <div className="container-animal-page">
        <h1 className="title">Cadastro de Animal</h1>
        <form action="" className="animal-form">
          <div className="animal-row">
            <div className="animal-col">
              <input
                type="text"
                placeholder="Nome:"
                className="animal-input-field"
              />
            </div>
            <div className="animal-col">
              <input
                type="text"
                placeholder="Espécie:"
                className="animal-input-field"
              />
            </div>
          </div>

          <div className="animal-row">
            <div className="animal-col">
              <input
                type="text"
                placeholder="Raça:"
                className="animal-input-field"
              />
            </div>
            <div className="animal-col">
              <input
                type="text"
                placeholder="Idade:"
                className="animal-input-field"
              />
            </div>
            <div className="animal-col">
              <input
                type="text"
                placeholder="Porte:"
                className="animal-input-field"
              />
            </div>
          </div>

          <div className="animal-row">
            <textarea
              rows="6"
              className="animal-textarea"
              placeholder="Descrição (opcional)"
            ></textarea>
          </div>

          <div className="animal-row animal-buttons">
            <div className="animal-col">
              <button type="button" className="btn-animal-action btn-foto">
                Foto
              </button>
            </div>
            <div className="animal-col">
              <button type="submit" className="btn-animal-action btn-salvar">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
