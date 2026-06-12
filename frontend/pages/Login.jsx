import React, { useState } from "react";
import "./Login.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/auth/login", { email, senha });

      // Salva o usuário no localStorage para persistir a sessão
      localStorage.setItem("usuario", JSON.stringify(response.data));

      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response && error.response.status === 401) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Ocorreu um erro ao tentar entrar. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <form className="forms-login" onSubmit={handleLoginSubmit}>
      <div className="input-container">
        <input
          type="email"
          className="input-field"
          placeholder="E-mail:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          className="input-field"
          placeholder="Senha:"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      {erro && <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>{erro}</p>}
      <button type="submit" className="btn-enviar">
        Entrar
      </button>
    </form>
  );
}
import React, { useState } from "react";
import "./Login.css";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, senha });

      localStorage.setItem("id_ong", res.data.id_ong);
      localStorage.setItem("usuario", JSON.stringify(res.data));
      navigate("/home");
    } catch (err) {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="forms-login" onSubmit={handleLoginSubmit}>
      <div className="input-container">
        <input
          type="email"
          className="input-field"
          placeholder="E-mail:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          className="input-field"
          placeholder="Senha:"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" className="btn-enviar" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
