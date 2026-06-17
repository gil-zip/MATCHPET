import React, { useEffect, useState } from "react";
import "./Navbar.css";
import userPlaceholder from "../imgs/user-placeholder.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onOpenMenu }) {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuario");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  const fotoPerfil = usuario?.imagem || userPlaceholder;

  return (
    <nav className="navbar-animal">
      <div className="menu-btn-container">
        <button
          className="navbar-toggler-custom"
          type="button"
          onClick={onOpenMenu}
        >
          <span className="toggler-icon-custom"></span>
        </button>
      </div>
      <div className="profile-container">
        <button
          type="button"
          className="profile-pic-btn"
          onClick={() => navigate("/perfil")}
        >
          <img
            src={fotoPerfil}
            alt="foto de perfil"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </button>
      </div>
    </nav>
  );
}
