import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./ListaAnimais.css";
import api from "../api/api";
import userPlaceholder from "../imgs/user-placeholder.png";

export default function ListaAnimais() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [animais, setAnimais] = useState([]);
  const [nomesOng, setNomesOng] = useState({}); // { id_ong: "Nome da ONG" }
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [formEdicao, setFormEdicao] = useState({});
  const [loadingSolicitar, setLoadingSolicitar] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const tipoUsuario = usuario?.tp_usuario?.toLowerCase();
  const isGerenciador =
    tipoUsuario === "ong" ||
    tipoUsuario === "protetor" ||
    tipoUsuario === "independente";

  useEffect(() => {
    api
      .get("/animais")
      .then((res) => {
        const todos = res.data;

        let lista;
        if (isGerenciador) {
          lista = todos.filter(
            (a) => Number(a.id_ong) === Number(usuario.id_usuario),
          );
        } else {
          lista = todos.filter((a) => {
            const s = (a.status || "").toLowerCase();
            return (
              s !== "indisponivel" &&
              s !== "indisponível" &&
              s !== "em andamento"
            );
          });
        }

        setAnimais(lista);

        // Para adotante: busca nomes das ONGs únicas que aparecem na lista
        if (!isGerenciador) {
          const idsUnicos = [
            ...new Set(lista.map((a) => a.id_ong).filter(Boolean)),
          ];
          Promise.all(
            idsUnicos.map((id) =>
              api
                .get(`/usuarios/${id}`)
                .then((r) => ({ id, nome: r.data.nome })),
            ),
          )
            .then((resultados) => {
              const mapa = {};
              resultados.forEach(({ id, nome }) => {
                mapa[id] = nome;
              });
              setNomesOng(mapa);
            })
            .catch(() => {});
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar animais:", error);
      });
  }, []);

  function abrirModal(animal) {
    setAnimalSelecionado(animal);
    setModoEdicao(false);
    setFormEdicao({ ...animal });
  }

  function fecharModal() {
    setAnimalSelecionado(null);
    setModoEdicao(false);
    setFormEdicao({});
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({ ...prev, [name]: value }));
  }

  function salvarEdicao() {
    api
      .put(`/animais/${animalSelecionado.id_animal}`, formEdicao)
      .then((response) => {
        setAnimais((prev) =>
          prev.map((a) =>
            a.id_animal === animalSelecionado.id_animal ? response.data : a,
          ),
        );
        setAnimalSelecionado(response.data);
        setModoEdicao(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar animal:", error);
      });
  }

  function excluirAnimal(id) {
    if (!window.confirm("Tem certeza que deseja excluir este animal?")) return;
    api
      .delete(`/animais/${id}`)
      .then(() => {
        setAnimais((prev) => prev.filter((a) => a.id_animal !== id));
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao excluir animal:", error);
      });
  }

  function solicitarAdocao() {
    setLoadingSolicitar(true);
    api
      .patch(`/animais/${animalSelecionado.id_animal}`, {
        status: "em andamento",
      })
      .then(() => {
        setAnimais((prev) =>
          prev.filter((a) => a.id_animal !== animalSelecionado.id_animal),
        );
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao solicitar adoção:", error);
      })
      .finally(() => setLoadingSolicitar(false));
  }

  return (
    <main className="lista-animais-page">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />
      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <h1 className="title">
        {isGerenciador ? "Meus Animais Cadastrados" : "Animais Disponíveis"}
      </h1>

      {isGerenciador && animais.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-msg">
            Você ainda não cadastrou nenhum animal.
          </p>
          <a href="/cadAnimal" className="btn-cadastrar">
            Cadastrar
          </a>
        </div>
      )}

      <div className="animais-grid">
        {animais.map((animal) => (
          <div
            className="animal-card"
            key={animal.id_animal}
            onClick={() => abrirModal(animal)}
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

              {!isGerenciador && animal.id_ong && (
                <p>
                  <span>ONG / Protetor:</span>{" "}
                  {nomesOng[animal.id_ong] || "Carregando..."}
                </p>
              )}

              {isGerenciador && (
                <p>
                  <span>Status:</span>{" "}
                  <span
                    className={`status-badge status-${(animal.status || "disponivel").replace(" ", "-")}`}
                  >
                    {animal.status || "disponível"}
                  </span>
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
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-fechar" onClick={fecharModal}>
              &times;
            </button>

            <img
              src={animalSelecionado.imagem || userPlaceholder}
              alt={animalSelecionado.nome}
              className="modal-img"
            />

            {isGerenciador && modoEdicao ? (
              <>
                <h2 className="modal-nome">Editar Animal</h2>
                <div className="modal-info modal-form">
                  <label>
                    <span>Nome</span>
                    <input
                      name="nome"
                      value={formEdicao.nome || ""}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label>
                    <span>Espécie</span>
                    <input
                      name="especie"
                      value={formEdicao.especie || ""}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label>
                    <span>Raça</span>
                    <input
                      name="raca"
                      value={formEdicao.raca || ""}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label>
                    <span>Idade (anos)</span>
                    <input
                      name="idade"
                      type="number"
                      value={formEdicao.idade || ""}
                      onChange={handleFormChange}
                    />
                  </label>
                  <label>
                    <span>Porte</span>
                    <select
                      name="porte"
                      value={formEdicao.porte || ""}
                      onChange={handleFormChange}
                    >
                      <option value="">Selecione</option>
                      <option value="Pequeno">Pequeno</option>
                      <option value="Médio">Médio</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </label>
                  <label>
                    <span>Status</span>
                    <select
                      name="status"
                      value={formEdicao.status || ""}
                      onChange={handleFormChange}
                    >
                      <option value="disponível">Disponível</option>
                      <option value="em andamento">Em andamento</option>
                      <option value="indisponível">Indisponível</option>
                    </select>
                  </label>
                  <label>
                    <span>Especificidades</span>
                    <textarea
                      name="especificidades"
                      value={formEdicao.especificidades || ""}
                      onChange={handleFormChange}
                      rows={3}
                    />
                  </label>
                </div>
                <div className="modal-acoes-edicao">
                  <button className="btn-salvar" onClick={salvarEdicao}>
                    Salvar
                  </button>
                  <button
                    className="btn-cancelar"
                    onClick={() => setModoEdicao(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="modal-nome">{animalSelecionado.nome}</h2>
                <div className="modal-info">
                  <p>
                    <span>Espécie:</span> {animalSelecionado.especie}
                  </p>
                  <p>
                    <span>Raça:</span>{" "}
                    {animalSelecionado.raca || "Não informada"}
                  </p>
                  <p>
                    <span>Idade:</span> {animalSelecionado.idade}{" "}
                    {animalSelecionado.idade === 1 ? "ano" : "anos"}
                  </p>
                  <p>
                    <span>Porte:</span> {animalSelecionado.porte}
                  </p>

                  {!isGerenciador && animalSelecionado.id_ong && (
                    <p>
                      <span>ONG / Protetor:</span>{" "}
                      {nomesOng[animalSelecionado.id_ong] || "Carregando..."}
                    </p>
                  )}

                  {isGerenciador && (
                    <p>
                      <span>Status:</span>{" "}
                      <span
                        className={`status-badge status-${(animalSelecionado.status || "disponivel").replace(" ", "-")}`}
                      >
                        {animalSelecionado.status || "disponível"}
                      </span>
                    </p>
                  )}
                  {animalSelecionado.especificidades && (
                    <p>
                      <span>Descrição:</span>{" "}
                      {animalSelecionado.especificidades}
                    </p>
                  )}
                </div>

                {isGerenciador && (
                  <div className="modal-acoes-gerenciador">
                    <button
                      className="btn-editar"
                      onClick={() => setModoEdicao(true)}
                    >
                      Editar Informações
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => excluirAnimal(animalSelecionado.id_animal)}
                    >
                      Excluir Animal
                    </button>
                  </div>
                )}

                {tipoUsuario === "adotante" && (
                  <button
                    className="btn-adotar"
                    onClick={solicitarAdocao}
                    disabled={loadingSolicitar}
                  >
                    {loadingSolicitar ? "Solicitando..." : "Solicitar Adoção"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
