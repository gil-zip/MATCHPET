import React, { useState, useEffect } from 'react';
import './solicitacoes.css'; // Certifique-se de que o CSS está no mesmo diretório

// URL do endpoint do back-end (Spring Boot)
const API_URL = "http://localhost:8080/api/solicitacoes";

export default function Solicitacoes() {
  // Estados para armazenar as duas listas enviadas pelo back-end
  const [dados, setDados] = useState({ pendentes: [], andamento: [] });
  
  // Estados de controle para renderização condicional (UX)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function carregarSolicitacoes() {
      try {
        const resposta = await fetch(API_URL);
        
        // Verifica se o status HTTP está na faixa de sucesso (200-299)
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        // Formato esperado do JSON: { pendentes: [...], andamento: [...] }
        const json = await resposta.json();
        
        // Garante que o estado receba arrays válidos, mesmo se vazios
        setDados({
          pendentes: json.pendentes || [],
          andamento: json.andamento || []
        });
      } catch (erro) {
        console.error("Falha ao buscar solicitações:", erro);
        setError(true);
      } finally {
        setLoading(false); // Desativa o carregando independente do sucesso ou erro
      }
    }

    carregarSolicitacoes();
  }, []);

  // Handler para tratar a ação do botão 'Abrir'
  const abrirSolicitacao = (id) => {
    console.log("Abrir solicitação ID:", id);
    // Para navegação real, substituir pelo roteador escolhido (ex: useNavigate do react-router-dom)
    // Exemplo: window.location.href = `/solicitacoes/${id}`;
  };

  // Função utilitária que renderiza os elementos ou mensagens de feedback de acordo com o estado atual
  const renderizarGrade = (lista) => {
    if (loading) return <p className="estado-msg">Carregando...</p>;
    if (error) return <p className="estado-msg">Erro ao carregar. Tente novamente.</p>;
    if (lista.length === 0) return <p className="estado-msg">Nenhuma solicitação encontrada.</p>;

    return lista.map((item) => (
      // O atributo 'key' deve mapear a chave primária única do banco de dados (id)
      <div className="card" key={item.id}>
        <p className="card-line"><strong>Adotante:</strong> {item.adotante}</p>
        <p className="card-line"><strong>CPF:</strong> {item.cpf}</p>
        <p className="card-line"><strong>Código do Animal:</strong> {item.codigoAnimal}</p>
        <button className="card-btn" onClick={() => abrirSolicitacao(item.id)}>
          Abrir
        </button>
      </div>
    ));
  };

  return (
    <>
      {/* Barra de Navegação Superior Fictícia */}
      <header className="topbar">
        <span className="topbar-logo">MatchPet</span>
        <div className="topbar-avatar">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      </header>

      {/* Conteúdo Principal em Grid */}
      <main className="page">
        <h1 className="page-title">Solicitações de Adoção</h1>

        <div className="columns">
          {/* Seção das solicitações pendentes */}
          <div className="column">
            <div className="col-header">
              <span className="col-label-text">Pendentes</span>
              <span className="badge">{dados.pendentes.length}</span>
            </div>
            <div className="cards-grid">
              {renderizarGrade(dados.pendentes)}
            </div>
          </div>

          {/* Seção das solicitações em andamento */}
          <div className="column">
            <div className="col-header">
              <span className="col-label-text">Em Andamento</span>
              <span className="badge">{dados.andamento.length}</span>
            </div>
            <div className="cards-grid">
              {renderizarGrade(dados.andamento)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}