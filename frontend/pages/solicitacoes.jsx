import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./solicitacoes.css";
import api from "../api/api";
import userPlaceholder from "../imgs/user-placeholder.png";

export default function Solicitacoes() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [loadingAceitar, setLoadingAceitar] = useState(false);
  const [loadingCancelar, setLoadingCancelar] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const tipoUsuario = usuario?.tp_usuario?.toLowerCase(); // "ong", "independente" ou "adotante"
  const isGerenciador = tipoUsuario === "ong" || tipoUsuario === "independente";

  useEffect(() => {
    api
      .get("/adocoes")
      .then((res) => {
        const todas = res.data;

        if (isGerenciador) {
          setSolicitacoes(todas);
        } else {
          // Adotante vê apenas as suas próprias solicitações
          const minhas = todas.filter(
            (s) => s.id_usuario === usuario.id_usuario,
          );
          setSolicitacoes(minhas);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar solicitações:", error);
      });
  }, []);

  function abrirModal(solicitacao) {
    // Busca a imagem do animal ao abrir o modal
    api
      .get(`/animais/${solicitacao.id_animal}`)
      .then((res) => {
        setSelecionada({
          ...solicitacao,
          imagemAnimal: res.data.imagem || null,
        });
      })
      .catch(() => {
        // Se falhar, abre o modal sem imagem
        setSelecionada({ ...solicitacao, imagemAnimal: null });
      });
  }

  function fecharModal() {
    setSelecionada(null);
  }

  function aceitarSolicitacao() {
    setLoadingAceitar(true);
    api
      .patch(`/adocoes/${selecionada.id_adocao}/status`, {
        status: "EM_ANDAMENTO",
      })
      .then((res) => {
        setSolicitacoes((prev) =>
          prev.map((s) =>
            s.id_adocao === selecionada.id_adocao ? res.data : s,
          ),
        );
        setSelecionada({ ...res.data, imagemAnimal: selecionada.imagemAnimal });
      })
      .catch((error) => {
        console.error("Erro ao aceitar solicitação:", error);
      })
      .finally(() => setLoadingAceitar(false));
  }

  function cancelarSolicitacao() {
    if (!window.confirm("Tem certeza que deseja cancelar esta solicitação?"))
      return;
    setLoadingCancelar(true);
    api
      .delete(`/adocoes/${selecionada.id_adocao}`)
      .then(() => {
        setSolicitacoes((prev) =>
          prev.filter((s) => s.id_adocao !== selecionada.id_adocao),
        );
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao cancelar solicitação:", error);
      })
      .finally(() => setLoadingCancelar(false));
  }

  function getStatusClass(status) {
    if (!status) return "";
    const s = status.toUpperCase();
    if (s === "PENDENTE") return "status-pendente";
    if (s === "EM_ANDAMENTO") return "status-andamento";
    if (s === "FINALIZADA") return "status-finalizada";
    return "";
  }

  function getStatusLabel(status) {
    if (!status) return "";
    const s = status.toUpperCase();
    if (s === "PENDENTE") return "Pendente";
    if (s === "EM_ANDAMENTO") return "Em andamento";
    if (s === "FINALIZADA") return "Finalizada";
    return status;
  }

  function getImageSrc(base64) {
    if (!base64) return userPlaceholder;
    if (base64.startsWith("data:")) return base64;
    return `data:image/jpeg;base64,${base64}`;
  }

  return (
    <main className="solicitacoes-page">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />
      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <h1 className="title">
        {isGerenciador ? "Solicitações Recebidas" : "Minhas Solicitações"}
      </h1>

      {/* Estado vazio */}
      {solicitacoes.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-msg">
            {isGerenciador
              ? "Nenhuma solicitação recebida ainda."
              : "Você ainda não fez nenhuma solicitação de adoção."}
          </p>
        </div>
      )}

      <div className="solicitacoes-grid">
        {solicitacoes.map((s) => (
          <div
            className="solicitacao-card"
            key={s.id_adocao}
            onClick={() => abrirModal(s)}
          >
            <div className="solicitacao-card-info">
              <h2 className="solicitacao-card-nome">{s.nomeAnimal}</h2>

              {isGerenciador && (
                <p>
                  <span>Adotante:</span> {s.nomeUsuario || "Não informado"}
                </p>
              )}

              <p>
                <span>Status:</span>{" "}
                <span className={`status-badge ${getStatusClass(s.status)}`}>
                  {getStatusLabel(s.status)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selecionada && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-fechar" onClick={fecharModal}>
              &times;
            </button>

            <img
              src={getImageSrc(selecionada.imagemAnimal)}
              alt={selecionada.nomeAnimal}
              className="modal-img"
            />

            <h2 className="modal-nome">{selecionada.nomeAnimal}</h2>

            <div className="modal-info">
              {isGerenciador && (
                <>
                  <p>
                    <span>Adotante:</span>{" "}
                    {selecionada.nomeUsuario || "Não informado"}
                  </p>
                  <p>
                    <span>Telefone:</span>{" "}
                    {selecionada.telefoneUsuario || "Não informado"}
                  </p>
                </>
              )}
              <p>
                <span>Status:</span>{" "}
                <span
                  className={`status-badge ${getStatusClass(selecionada.status)}`}
                >
                  {getStatusLabel(selecionada.status)}
                </span>
              </p>
            </div>

            {/* Gerenciador pode aceitar solicitações pendentes */}
            {isGerenciador &&
              selecionada.status?.toUpperCase() === "PENDENTE" && (
                <button
                  className="btn-aceitar"
                  onClick={aceitarSolicitacao}
                  disabled={loadingAceitar}
                >
                  {loadingAceitar ? "Processando..." : "Aceitar Solicitação"}
                </button>
              )}

            {/* Adotante pode cancelar solicitações pendentes */}
            {!isGerenciador &&
              selecionada.status?.toUpperCase() === "PENDENTE" && (
                <button
                  className="btn-cancelar-solicitacao"
                  onClick={cancelarSolicitacao}
                  disabled={loadingCancelar}
                >
                  {loadingCancelar ? "Cancelando..." : "Cancelar Solicitação"}
                </button>
              )}
          </div>
        </div>
      )}
    </main>
  );
}
