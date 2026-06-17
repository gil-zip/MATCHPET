import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./AlterarPerfil.css";
import "./Cadastro.css";
import api from "../services/api";

// ── Máscaras ──────────────────────────────────────────────────────────────────

const aplicarMascaraCPF = (valor) => {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  return nums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const aplicarMascaraCNPJ = (valor) => {
  const nums = valor.replace(/\D/g, "").slice(0, 14);
  return nums
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

const aplicarMascaraTelefone = (valor) => {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 10) {
    return nums
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }
  return nums
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
};

const aplicarMascaraCEP = (valor) => {
  const nums = valor.replace(/\D/g, "").slice(0, 8);
  return nums.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
};

const formatarCPF = (valor) => aplicarMascaraCPF(valor || "");
const formatarCNPJ = (valor) => aplicarMascaraCNPJ(valor || "");
const formatarTelefone = (valor) => aplicarMascaraTelefone(valor || "");
const formatarCEP = (valor) => {
  const nums = (valor || "").replace(/\D/g, "").slice(0, 8);
  return nums.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
};

// ── Indicador de etapas ───────────────────────────────────────────────────────

const ETAPAS = [
  { num: 1, label: "Dados Pessoais" },
  { num: 2, label: "Endereço" },
  { num: 3, label: "Confirmação" },
];

function IndicadorEtapas({ etapaAtual }) {
  return (
    <div className="etapas-indicador">
      {ETAPAS.map((etapa, idx) => (
        <React.Fragment key={etapa.num}>
          <div
            className={`etapa-step ${etapaAtual >= etapa.num ? "ativa" : ""}`}
          >
            <div className="etapa-numero">{etapa.num}</div>
            <span className="etapa-label">{etapa.label}</span>
          </div>
          {idx < ETAPAS.length - 1 && <div className="etapa-linha" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function AlterarPerfil() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Dados do usuário logado vindos do localStorage
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario") || "{}");
  const isONG = usuarioSalvo.tp_usuario === "ONG";

  // ── Estado: dados pessoais ────────────────────────────────────────────────

  const [usuario, setUsuario] = useState({
    nome: usuarioSalvo.nome || "",
    email: usuarioSalvo.email || "",
    telefone: formatarTelefone(usuarioSalvo.telefone || ""),
    cpf: formatarCPF(usuarioSalvo.cpf || ""),
    cnpj: formatarCNPJ(usuarioSalvo.cnpj || ""),
    imagem: usuarioSalvo.imagem || "",
  });

  const [preview, setPreview] = useState(usuarioSalvo.imagem || null);

  // ── Estado: endereço ──────────────────────────────────────────────────────

  const endSalvo = usuarioSalvo.endereco || {};
  const [endereco, setEndereco] = useState({
    cep: formatarCEP(endSalvo.cep || ""),
    rua: endSalvo.rua || "",
    numero: endSalvo.numero || "",
    bairro: endSalvo.bairro || "",
    cidade: endSalvo.cidade || "",
    estado: endSalvo.estado || "",
    complemento: endSalvo.complemento || "",
  });

  // ── Estado: confirmação de senha ──────────────────────────────────────────

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaNovaSenha, setConfirmaNovaSenha] = useState("");
  const [alterarSenha, setAlterarSenha] = useState(false);

  // ── Handlers: dados pessoais ──────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleMascaraChange = (e, mascara) => {
    const { name } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: mascara(e.target.value) }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUsuario((prev) => ({ ...prev, imagem: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ── Handlers: endereço ────────────────────────────────────────────────────

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnderecoMascaraChange = (e, mascara) => {
    const { name } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: mascara(e.target.value) }));
  };

  const buscarCEP = async (cep) => {
    const nums = cep.replace(/\D/g, "");
    if (nums.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${nums}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setEndereco((prev) => ({
          ...prev,
          rua: data.logradouro || prev.rua,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          estado: data.uf || prev.estado,
        }));
      }
    } catch (_) {}
  };

  // ── Validações por etapa ──────────────────────────────────────────────────

  const validarEtapa1 = () => {
    if (!usuario.nome.trim()) return "O nome não pode estar vazio.";
    if (!usuario.email.trim()) return "O e-mail não pode estar vazio.";
    if (!usuario.telefone.trim()) return "O telefone não pode estar vazio.";
    if (isONG && !usuario.cnpj.trim()) return "O CNPJ não pode estar vazio.";
    if (!isONG && !usuario.cpf.trim()) return "O CPF não pode estar vazio.";
    return null;
  };

  const validarEtapa2 = () => {
    if (!endereco.cep.trim()) return "O CEP não pode estar vazio.";
    if (!endereco.rua.trim()) return "A rua não pode estar vazia.";
    if (!endereco.numero.trim()) return "O número não pode estar vazio.";
    if (!endereco.bairro.trim()) return "O bairro não pode estar vazio.";
    if (!endereco.cidade.trim()) return "A cidade não pode estar vazia.";
    if (!endereco.estado.trim()) return "O estado não pode estar vazio.";
    return null;
  };

  const validarEtapa3 = () => {
    if (!senhaAtual.trim())
      return "Digite sua senha atual para confirmar as alterações.";
    if (alterarSenha) {
      if (!novaSenha.trim()) return "Digite a nova senha.";
      if (novaSenha.length < 4)
        return "A nova senha deve ter ao menos 4 caracteres.";
      if (novaSenha !== confirmaNovaSenha) return "As senhas não coincidem.";
    }
    return null;
  };

  // ── Avançar etapas ────────────────────────────────────────────────────────

  const handleProximoEtapa1 = (e) => {
    e.preventDefault();
    setErro("");
    const erroValidacao = validarEtapa1();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }
    setEtapa(2);
  };

  const handleProximoEtapa2 = (e) => {
    e.preventDefault();
    setErro("");
    const erroValidacao = validarEtapa2();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }
    setEtapa(3);
  };

  // ── Submit final ──────────────────────────────────────────────────────────

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    const erroValidacao = validarEtapa3();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    // Verifica senha atual
    if (senhaAtual !== usuarioSalvo.senha) {
      setErro("Senha atual incorreta.");
      return;
    }

    setCarregando(true);

    try {
      const dadosUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone.replace(/\D/g, ""),
        cpf: isONG ? null : usuario.cpf.replace(/\D/g, ""),
        cnpj: isONG ? usuario.cnpj.replace(/\D/g, "") : null,
        imagem: usuario.imagem || null,
        senha: alterarSenha ? novaSenha : usuarioSalvo.senha,
        tp_usuario: usuarioSalvo.tp_usuario,
      };

      const dadosEndereco = {
        rua: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep.replace(/\D/g, ""),
        complemento: endereco.complemento || null,
      };

      // Atualiza usuário
      await api.put(`/usuarios/${usuarioSalvo.id_usuario}`, dadosUsuario);

      // Atualiza endereço
      const idEndereco = usuarioSalvo.endereco?.id_endereco;
      if (idEndereco) {
        await api.put(`/enderecos/${idEndereco}`, dadosEndereco);
      }

      // Atualiza localStorage com os novos dados
      const usuarioAtualizado = {
        ...usuarioSalvo,
        ...dadosUsuario,
        endereco: { ...usuarioSalvo.endereco, ...dadosEndereco },
      };
      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));

      setSucesso("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      const mensagem =
        error.response?.data ||
        "Erro ao atualizar perfil. Verifique os dados e tente novamente.";
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main className="main-content edit-profile-content">
      <Navbar onOpenMenu={() => setMenuAberto(true)} />
      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <h1 className="page-title">Alterar Perfil</h1>

      <div className="profile-form">
        <IndicadorEtapas etapaAtual={etapa} />

        {/* ── ETAPA 1: Dados Pessoais ── */}
        {etapa === 1 && (
          <form className="forms-cadastro" onSubmit={handleProximoEtapa1}>
            {/* Foto de perfil */}
            <div className="foto-perfil-container">
              <div
                className="foto-preview"
                onClick={() =>
                  document.getElementById("input-foto-perfil").click()
                }
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="foto-preview-img"
                  />
                ) : (
                  <div className="foto-placeholder">
                    <span className="foto-icone">📷</span>
                    <span className="foto-texto">
                      Clique para adicionar foto
                    </span>
                  </div>
                )}
              </div>
              <input
                id="input-foto-perfil"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {preview && (
                <button
                  type="button"
                  className="btn-trocar-foto"
                  onClick={() =>
                    document.getElementById("input-foto-perfil").click()
                  }
                >
                  Trocar foto
                </button>
              )}
            </div>

            {/* Nome */}
            <div className="input-container">
              <input
                type="text"
                name="nome"
                value={usuario.nome}
                className="input-field"
                placeholder="Nome:"
                onChange={handleChange}
                required
              />
            </div>

            {/* CPF / CNPJ + Telefone */}
            <div className="form-row">
              {isONG ? (
                <div className="input-container">
                  <input
                    type="text"
                    name="cnpj"
                    value={usuario.cnpj}
                    className="input-field"
                    placeholder="CNPJ: __.___.___/____-__"
                    onChange={(e) => handleMascaraChange(e, aplicarMascaraCNPJ)}
                    inputMode="numeric"
                    required
                  />
                </div>
              ) : (
                <div className="input-container">
                  <input
                    type="text"
                    name="cpf"
                    value={usuario.cpf}
                    className="input-field"
                    placeholder="CPF: ___.___.___-__"
                    onChange={(e) => handleMascaraChange(e, aplicarMascaraCPF)}
                    inputMode="numeric"
                    required
                  />
                </div>
              )}

              <div className="input-container">
                <input
                  type="text"
                  name="telefone"
                  value={usuario.telefone}
                  className="input-field"
                  placeholder="Telefone: (__) _____-____"
                  onChange={(e) =>
                    handleMascaraChange(e, aplicarMascaraTelefone)
                  }
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            {/* E-mail */}
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={usuario.email}
                className="input-field"
                placeholder="E-mail:"
                onChange={handleChange}
                required
              />
            </div>

            {erro && <p className="erro-msg">{erro}</p>}

            <button type="submit" className="btn-enviar">
              Próximo →
            </button>
          </form>
        )}

        {/* ── ETAPA 2: Endereço ── */}
        {etapa === 2 && (
          <form className="forms-cadastro" onSubmit={handleProximoEtapa2}>
            {/* CEP + Estado */}
            <div className="form-row">
              <div className="input-container">
                <input
                  type="text"
                  name="cep"
                  value={endereco.cep}
                  className="input-field"
                  placeholder="CEP: _____-___"
                  onChange={(e) => {
                    handleEnderecoMascaraChange(e, aplicarMascaraCEP);
                    buscarCEP(e.target.value);
                  }}
                  inputMode="numeric"
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="estado"
                  value={endereco.estado}
                  className="input-field"
                  placeholder="Estado (UF):"
                  onChange={handleEnderecoChange}
                  maxLength={2}
                  required
                />
              </div>
            </div>

            {/* Rua */}
            <div className="input-container">
              <input
                type="text"
                name="rua"
                value={endereco.rua}
                className="input-field"
                placeholder="Rua / Logradouro:"
                onChange={handleEnderecoChange}
                required
              />
            </div>

            {/* Número + Complemento */}
            <div className="form-row">
              <div className="input-container" style={{ flex: "0 0 35%" }}>
                <input
                  type="text"
                  name="numero"
                  value={endereco.numero}
                  className="input-field"
                  placeholder="Número:"
                  onChange={handleEnderecoChange}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="complemento"
                  value={endereco.complemento}
                  className="input-field"
                  placeholder="Complemento (opcional):"
                  onChange={handleEnderecoChange}
                />
              </div>
            </div>

            {/* Bairro + Cidade */}
            <div className="form-row">
              <div className="input-container">
                <input
                  type="text"
                  name="bairro"
                  value={endereco.bairro}
                  className="input-field"
                  placeholder="Bairro:"
                  onChange={handleEnderecoChange}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="cidade"
                  value={endereco.cidade}
                  className="input-field"
                  placeholder="Cidade:"
                  onChange={handleEnderecoChange}
                  required
                />
              </div>
            </div>

            {erro && <p className="erro-msg">{erro}</p>}

            <div className="botoes-row">
              <button
                type="button"
                className="btn-voltar"
                onClick={() => {
                  setErro("");
                  setEtapa(1);
                }}
              >
                ← Voltar
              </button>
              <button type="submit" className="btn-enviar">
                Próximo →
              </button>
            </div>
          </form>
        )}

        {/* ── ETAPA 3: Confirmação de Senha ── */}
        {etapa === 3 && (
          <form className="forms-cadastro" onSubmit={handleSubmitFinal}>
            <div className="input-container">
              <input
                type="password"
                value={senhaAtual}
                className="input-field"
                placeholder="Senha atual:"
                onChange={(e) => setSenhaAtual(e.target.value)}
                required
              />
            </div>

            {/* Toggle para alterar senha */}
            <div
              className="radio-group-main"
              style={{ justifyContent: "flex-start", gap: "12px" }}
            >
              <input
                type="checkbox"
                id="check-alterar-senha"
                checked={alterarSenha}
                onChange={(e) => setAlterarSenha(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  accentColor: "#ffa500",
                }}
              />
              <label
                htmlFor="check-alterar-senha"
                style={{ fontSize: "16px", cursor: "pointer" }}
              >
                Desejo alterar minha senha
              </label>
            </div>

            {alterarSenha && (
              <>
                <div className="input-container">
                  <input
                    type="password"
                    value={novaSenha}
                    className="input-field"
                    placeholder="Nova senha:"
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    value={confirmaNovaSenha}
                    className="input-field"
                    placeholder="Confirme a nova senha:"
                    onChange={(e) => setConfirmaNovaSenha(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {erro && <p className="erro-msg">{erro}</p>}
            {sucesso && (
              <p style={{ color: "green", fontSize: "14px", margin: "0" }}>
                {sucesso}
              </p>
            )}

            <div className="botoes-row">
              <button
                type="button"
                className="btn-voltar"
                onClick={() => {
                  setErro("");
                  setSucesso("");
                  setEtapa(2);
                }}
              >
                ← Voltar
              </button>
              <button
                type="submit"
                className="btn-enviar"
                disabled={carregando}
              >
                {carregando ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
