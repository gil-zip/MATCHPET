import { useState } from "react";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import iconePatinha from "./imgs/paw.png";
import Logo from "./imgs/Logo.png";
import "./App.css";

function App() {
  const [abaAtiva, setAbaAtiva] = useState("entrar");

  return (
    <div className="container-main">
      <div className="lado-esq">
        <div className="content">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src={iconePatinha} alt="Patinha" />
          </h1>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>

      <div className="lado-dir">
        <div className="content">
          <h1 className="name">
            <span style={{ color: "#ffffff" }}>MATCH</span>
            <span style={{ color: "#ffa500" }}>PET</span>
            <img src={iconePatinha} alt="Patinha" />
          </h1>

          <hr />

          <div className="links">
            <a
              href="#entrar"
              className={abaAtiva === "entrar" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setAbaAtiva("entrar");
              }}
            >
              Entrar
            </a>
            <a
              href="#cadastrar"
              className={abaAtiva === "cadastrar" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setAbaAtiva("cadastrar");
              }}
            >
              Cadastrar
            </a>
          </div>

          <div className="forms">
            {abaAtiva === "entrar" ? (
              <Login />
            ) : (
              <Cadastro aoSucesso={() => setAbaAtiva("entrar")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
