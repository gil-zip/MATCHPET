import React from "react";
import iconePatinha from "../imgs/paw.png";
import "./MenuLateral.css";
import { useNavigate } from "react-router-dom";

export default function MenuLateral({ isOpen, onCloseMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    //alert("Você saiu da conta.");
    navigate("/");
  };

  return (
    <div className={`menu ${isOpen ? "aberto" : ""}`}>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div className="col">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src={iconePatinha} alt="Patinha" />
          </h1>
        </div>
        <div className="col">
          <button className="btn-fechar" onClick={onCloseMenu}>
            X
          </button>{" "}
        </div>
      </div>
      <div className="hiperlinks">
        <a href="/home">
          <h3 className="link">Home</h3>
        </a>
        <a href="/cadAnimal">
          <h3 className="link">Cadastrar Animal</h3>
        </a>
        <a href="/animais">
          <h3 className="link">Animais</h3>
        </a>
        <a href="#">
          <h3 className="link">Solicitações</h3>
        </a>
      </div>
      <div className="sair">
        <button className="btn-fechar" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}
