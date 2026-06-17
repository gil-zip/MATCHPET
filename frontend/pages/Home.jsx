import React, { useState } from "react";
import Navbar from "./Navbar";
import MenuLateral from "./MenuLateral";
import "./Home.css";
import Logo from "../imgs/Logo.png";
import iconePatinha from "../imgs/paw.png";
import logoUnesp from "../imgs/unesp.png"; // substitua pelo caminho correto
import logoExtensao from "../imgs/extensao.svg"; // substitua pelo caminho correto

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);

  const criadores = [
    { nome: "Murilo Decario", email: "murilo.decario@unesp.br" },
    { nome: "Giovani Andreoli", email: "giovani.andreoli@unesp.br" },
    { nome: "Fabiano Antonin", email: "fabiano.antonin@unesp.br" },
    { nome: "Murilo Carlomagno", email: "murilo.carlomagno@unesp.br" },
    { nome: "Enzo Fornetti", email: "enzo.fornetti@unesp.br" },
  ];

  return (
    <div className="home-container">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />
      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      {/* Hero */}
      <div className="home-hero">
        {/* Coluna esquerda: logo do MatchPet + logos institucionais */}
        <div className="home-hero-left">
          <div className="home-logo-box">
            <h1 className="home-logo-name">
              <span style={{ color: "#ffffff" }}>MATCH</span>
              <span style={{ color: "#ffa500" }}>PET</span>
              <img src={iconePatinha} alt="Patinha" />
            </h1>
            <img src={Logo} alt="Logo MatchPet" />
          </div>

          {/* Logos institucionais */}
          <div className="home-institutional-logos">
            <img src={logoUnesp} alt="UNESP" className="home-inst-logo" />
            <img
              src={logoExtensao}
              alt="Área de Extensão"
              className="home-inst-logo"
            />
          </div>
        </div>

        {/* Coluna direita: texto completo */}
        <div className="home-hero-text">
          <p className="home-hero-tag">
            Projeto de Extensão Universitária · UNESP
          </p>
          <p className="home-hero-desc">
            O MatchPet é um projeto de extensão universitária da UNESP que
            nasceu da união entre a tecnologia e a paixão pela causa animal.
            Nosso objetivo é transformar o cenário da adoção, servindo como uma
            ponte digital, segura e totalmente gratuita entre quem quer adotar e
            quem precisa de ajuda para encontrar um lar para um animal
            resgatado.
          </p>
          <p className="home-hero-desc">
            Sabemos que o trabalho de ONGs e protetores independentes é um ato
            de amor heroico, mas que muitas vezes carece de visibilidade e
            suporte tecnológico. É aí que o MatchPet entra: centralizamos os
            cadastros de cães e gatos em uma plataforma intuitiva, facilitando
            para que futuros tutores encontrem seus novos melhores amigos de
            forma responsável e consciente.
          </p>
          <p className="home-hero-desc">
            Ao aproximar a universidade da comunidade, reforçamos o compromisso
            social da UNESP com o bem-estar animal e o controle populacional
            consciente. Navegue pelo site, conheça os animais disponíveis e
            encontre o seu match perfeito! ❤️
          </p>
        </div>
      </div>

      {/* Adoção Responsável */}
      <div className="home-section home-section--adoption">
        <h2 className="home-section-title">
          Por que adotar com responsabilidade?
        </h2>
        <div className="home-section-grid">
          <div className="home-pill">
            <span className="home-pill-icon">🏠</span>
            <div>
              <strong>Compromisso para a vida toda</strong>
              <p>
                Adotar é assumir um vínculo afetivo e uma responsabilidade
                duradoura com o bem-estar do animal.
              </p>
            </div>
          </div>
          <div className="home-pill">
            <span className="home-pill-icon">❤️</span>
            <div>
              <strong>Combate ao abandono</strong>
              <p>
                Cada adoção consciente libera espaço nos abrigos e reduz o ciclo
                de abandono nas ruas.
              </p>
            </div>
          </div>
          <div className="home-pill">
            <span className="home-pill-icon">🔍</span>
            <div>
              <strong>Conheça antes de adotar</strong>
              <p>
                Avaliar porte, temperamento e necessidades do animal garante uma
                convivência harmoniosa e duradoura.
              </p>
            </div>
          </div>
          <div className="home-pill">
            <span className="home-pill-icon">🤝</span>
            <div>
              <strong>Apoio às ONGs</strong>
              <p>
                Adotar via plataforma valoriza o trabalho heroico de protetores
                e abrigos que resgatam e cuidam diariamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Funcionalidades por perfil */}
      <div className="home-section home-section--features">
        <h2 className="home-section-title">
          O que você pode fazer no MatchPet
        </h2>
        <div className="home-features-grid">
          <div className="home-feature-card home-feature-card--adopter">
            <h3 className="home-feature-role">🐾 Adotante</h3>
            <ul>
              <li>
                Explorar animais de diversas ONGs e protetores em um só lugar
              </li>
              <li>Filtrar pets por espécie, porte, idade e localização</li>
              <li>Enviar solicitações de adoção para um ou mais animais</li>
              <li>Acompanhar o status das suas solicitações</li>
              <li>Editar seu perfil e preferências a qualquer momento</li>
            </ul>
          </div>
          <div className="home-feature-card home-feature-card--ong">
            <h3 className="home-feature-role">🏥 ONG / Protetor</h3>
            <ul>
              <li>
                Cadastrar, editar e excluir animais disponíveis para adoção
              </li>
              <li>
                Adicionar fotos, histórico e informações detalhadas de cada pet
              </li>
              <li>
                Receber e analisar solicitações de adoção de cada adotante
              </li>
              <li>
                Gerenciar múltiplas solicitações por animal de forma organizada
              </li>
              <li>Editar o perfil da instituição ou protetor independente</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contato */}
      <div className="home-section home-section--contact">
        <h2 className="home-section-title">Fale com a equipe</h2>
        <p className="home-contact-sub">
          Dúvidas, sugestões ou parcerias? Fale diretamente com os
          desenvolvedores do projeto.
        </p>
        <div className="home-contact-grid">
          {criadores.map((c) => (
            <a
              key={c.email}
              className="home-contact-card"
              href={`mailto:${c.email}`}
            >
              <span className="home-contact-avatar">{c.nome.charAt(0)}</span>
              <div>
                <strong>{c.nome}</strong>
                <span>{c.email}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
