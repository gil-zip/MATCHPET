import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./ListaAnimais.css";
import api from "../api/api";
import userPlaceholder from "../imgs/user-placeholder.png";

export default function ListaAnimais() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [animais, setAnimais] = useState([]);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    api
      .get("/animais")
      .then((response) => {
        const disponiveis = response.data.filter(
          (a) => a.status !== "indisponivel",
        );
        setAnimais(disponiveis);
      })
      .catch((error) => {
        console.error("Erro ao buscar animais:", error);
      });
  }, []);

  return (
    <main className="lista-animais-page">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />
      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <h1 className="title">Animais Disponíveis</h1>

      <div className="animais-grid">
        {animais.map((animal) => (
          <div
            className="animal-card"
            key={animal.id}
            onClick={() => setAnimalSelecionado(animal)}
          >
            <img
              src={animal.imagem || userPlaceholder}
              alt={animal.nome}
              className="animal-card-img"
            />
            <div className="animal-card-info">
              <h2 className="animal-card-nome">{animal.nome}</h2>
              <p>
                <span>Espécie:</span> {animal.especie}
              </p>
              <p>
                <span>Raça:</span> {animal.raca || "Não informada"}
              </p>
              <p>
                <span>Idade:</span> {animal.idade}{" "}
                {animal.idade === 1 ? "ano" : "anos"}
              </p>
              <p>
                <span>Porte:</span> {animal.porte}
              </p>
              {animal.ong && (
                <p>
                  <span>ONG:</span> {animal.ong.nome}
                </p>
              )}
              {animal.especificidades && (
                <div className="animal-card-desc-wrapper">
                  <p className="animal-card-desc">{animal.especificidades}</p>
                  <span className="ler-mais">ler mais</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {animalSelecionado && (
        <div
          className="modal-overlay"
          onClick={() => setAnimalSelecionado(null)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-fechar"
              onClick={() => setAnimalSelecionado(null)}
            >
              &times;
            </button>

            <img
              src={animalSelecionado.imagem || userPlaceholder}
              alt={animalSelecionado.nome}
              className="modal-img"
            />

            <h2 className="modal-nome">{animalSelecionado.nome}</h2>

            <div className="modal-info">
              <p>
                <span>Espécie:</span> {animalSelecionado.especie}
              </p>
              <p>
                <span>Raça:</span> {animalSelecionado.raca || "Não informada"}
              </p>
              <p>
                <span>Idade:</span> {animalSelecionado.idade}{" "}
                {animalSelecionado.idade === 1 ? "ano" : "anos"}
              </p>
              <p>
                <span>Porte:</span> {animalSelecionado.porte}
              </p>
              {animalSelecionado.ong && (
                <p>
                  <span>ONG:</span> {animalSelecionado.ong.nome}
                </p>
              )}
              {animalSelecionado.especificidades && (
                <p>
                  <span>Descrição:</span> {animalSelecionado.especificidades}
                </p>
              )}
            </div>

            {usuario?.tipo === "adotante" && (
              <button className="btn-adotar">Solicitar Adoção</button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
