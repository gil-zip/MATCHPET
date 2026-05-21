import React, { useState } from "react";
import Navbar from "./Navbar";
import MenuLateral from "./MenuLateral";
import "./Home.css";
import Logo from "../imgs/Logo.png";
import iconePatinha from "../imgs/paw.png";

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="home-container">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />

      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <div className="home-row">
        <div className="home-col">
          <div
            className="home-logo-box"
            onClick={() => console.log("Click Logo")}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <h1 className="home-logo-name">
              <span style={{ color: "#ffffff" }}>MATCH</span>
              <span style={{ color: "#ffa500" }}>PET</span>
              <img src={iconePatinha} alt="Patinha" />
            </h1>
            <img src={Logo} alt="Logo MatchPet" />
          </div>
        </div>
        <div className="home-col">
          <div
            className="home-card-sobre"
            onClick={() => console.log("Click Sobre")}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <h3 className="title">Sobre o MatchPet</h3>
            <p>
              O MatchPet foi criado para unir animais que precisam de um lar
              amoroso a famílias que desejam um novo amigo de quatro patas.
              Nossa plataforma facilita o processo de adoção e ajuda ONGs na
              gestão diária.
            </p>
          </div>
        </div>
      </div>

      <div className="home-row">
        <div className="home-col">
          <div
            className="home-card-cadastro"
            onClick={() => console.log("Click Cadastro")}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <h3 className="title">Cadastre seu Pet</h3>
            <p>
              Se você é uma ONG ou protetor independente, registre os animais
              disponíveis para adoção informando fotos, porte, idade e
              temperamento.
            </p>
          </div>
        </div>
        <div className="home-col">
          <div
            className="home-card-adocoes"
            onClick={() => console.log("Click Adocoes")}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <h3 className="title">Adoções Recentes</h3>
            <p>
              Acompanhe as histórias de sucesso e os finais felizes de cães e
              gatos que encontraram um novo lar através da nossa aplicação.
            </p>
          </div>
        </div>
        <div className="home-col">
          <div
            className="home-card-ongs"
            onClick={() => console.log("Click Ongs")}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <h3 className="title">ONGs Parceiras</h3>
            <p>
              Conheça as instituições e abrigos que trabalham incansavelmente
              todos os dias para resgatar, cuidar e proteger animais
              abandonados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
