import React from "react";
import "./Login.css";

export default function Login() {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="forms-login" onSubmit={handleLoginSubmit}>
      <div className="input-container">
        <input
          type="email"
          className="input-field"
          placeholder="E-mail:"
          required
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          className="input-field"
          placeholder="Senha:"
          required
        />
      </div>
      <button type="submit" className="btn-enviar">
        Entrar
      </button>
    </form>
  );
}
