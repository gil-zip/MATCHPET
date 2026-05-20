import React from "react";
import iconePatinha from "../imgs/paw.png";
import "./MenuLateral.css";

export default function MenuLateral() {
  return (
    <div className="menu">
      <div className="row">
        <div className="col">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src={iconePatinha} alt="Patinha" />
          </h1>
        </div>
        <div className="col">
          <button className="btn-fechar">X</button>
        </div>
      </div>
      <div className="hiperlinks">
        <a href="#">
          <h3 className="link">Home</h3>
        </a>
        <a href="#">
          <h3 className="link">Cadastrar Animal</h3>
        </a>
        <a href="#">
          <h3 className="link">Animais</h3>
        </a>
        <a href="#">
          <h3 className="link">Solicitações</h3>
        </a>
      </div>
      <div className="sair">
        <button className="btn-fechar">Sair</button>
      </div>
    </div>
  );
}
