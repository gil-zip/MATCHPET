import React from "react";
import "./Navbar.css";

export default function Navbar({ onOpenMenu }) {
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
        <button type="button" className="profile-pic-btn">
          <img src="" alt="foto de perfil" />
        </button>
      </div>
    </nav>
  );
}
