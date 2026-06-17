import React, { useState } from "react";
import "./Cadastro.css";
import api from "../services/api";

export default function Cadastro({ aoSucesso }) {
  const [etapa, setEtapa] = useState(1);

  const [tipoUsuario, setTipoUsuario] = useState("ong_protetor");
  const [subtipo, setSubtipo] = useState("ong");

  const [usuario, setUsuario] = useState({
    nome: "",
    cpf: "",
    cnpj: "",
    telefone: "",
    email: "",
    senha: "",
    imagem: "",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
  });

  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [preview, setPreview] = useState(null);

  // ── Máscaras ──────────────────────────────────────────────────────────────

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

  // ── Handlers gerais ───────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleMascaraChange = (e, mascara) => {
    const { name } = e.target;
    setUsuario({ ...usuario, [name]: mascara(e.target.value) });
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco({ ...endereco, [name]: value });
  };

  const handleEnderecoMascaraChange = (e, mascara) => {
    const { name } = e.target;
    setEndereco({ ...endereco, [name]: mascara(e.target.value) });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUsuario((prev) => ({ ...prev, imagem: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ── Busca CEP ─────────────────────────────────────────────────────────────

  const buscarCEP = async (cep) => {
    const nums = cep.replace(/\D/g, "");
    if (nums.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${nums}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setEndereco((prev) => ({
          ...prev,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch (_) {}
  };

  // ── Avança para a etapa 2 ─────────────────────────────────────────────────

  const handleProximo = (e) => {
    e.preventDefault();
    setErro("");

    if (usuario.senha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEtapa(2);
  };

  // ── Submete cadastro completo ─────────────────────────────────────────────

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    let tp_usuario;
    if (tipoUsuario === "adotante") {
      tp_usuario = "ADOTANTE";
    } else if (subtipo === "ong") {
      tp_usuario = "ONG";
    } else {
      tp_usuario = "INDEPENDENTE";
    }

    const dados = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      telefone: usuario.telefone.replace(/\D/g, ""),
      tp_usuario,
      cpf: tp_usuario !== "ONG" ? usuario.cpf.replace(/\D/g, "") : null,
      cnpj: tp_usuario === "ONG" ? usuario.cnpj.replace(/\D/g, "") : null,
      imagem: usuario.imagem || null,
      endereco: {
        rua: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep.replace(/\D/g, ""),
        complemento: endereco.complemento || null,
      },
    };

    try {
      await api.post("/usuarios", dados);
      if (aoSucesso) aoSucesso();
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      const mensagem =
        error.response?.data ||
        "Erro ao realizar cadastro. Verifique os dados e tente novamente.";
      setErro(mensagem);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="cadastro-wrapper">
      {/* ── ETAPA 1 ── */}
      {etapa === 1 && (
        <form className="forms-cadastro" onSubmit={handleProximo}>
          <div className="radio-group-main">
            <span className="radio-label">Você é um(a):</span>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="tipo_usuario"
                  value="adotante"
                  checked={tipoUsuario === "adotante"}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                />
                <span>Adotante</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo_usuario"
                  value="ong_protetor"
                  checked={tipoUsuario === "ong_protetor"}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                />
                <span>ONG ou Protetor</span>
              </label>
            </div>
          </div>

          {tipoUsuario === "ong_protetor" && (
            <div className="radio-group-sub">
              <label>
                <input
                  type="radio"
                  name="subtipo"
                  value="ong"
                  checked={subtipo === "ong"}
                  onChange={(e) => setSubtipo(e.target.value)}
                />
                <span>ONG</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="subtipo"
                  value="protetor"
                  checked={subtipo === "protetor"}
                  onChange={(e) => setSubtipo(e.target.value)}
                />
                <span>Protetor Independente</span>
              </label>
            </div>
          )}

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

          <div className="form-row">
            {tipoUsuario === "ong_protetor" && (
              <div className="input-container">
                <input
                  type="text"
                  name="cnpj"
                  value={usuario.cnpj}
                  className={`input-field ${subtipo === "protetor" ? "disabled-field" : ""}`}
                  placeholder="CNPJ: __.___.___/____-__"
                  disabled={subtipo === "protetor"}
                  onChange={(e) => handleMascaraChange(e, aplicarMascaraCNPJ)}
                  inputMode="numeric"
                  required={subtipo === "ong"}
                />
              </div>
            )}

            <div className="input-container">
              <input
                type="text"
                name="cpf"
                value={usuario.cpf}
                className={`input-field ${tipoUsuario === "ong_protetor" && subtipo === "ong" ? "disabled-field" : ""}`}
                placeholder="CPF: ___.___.___-__"
                disabled={tipoUsuario === "ong_protetor" && subtipo === "ong"}
                onChange={(e) => handleMascaraChange(e, aplicarMascaraCPF)}
                inputMode="numeric"
                required={tipoUsuario === "adotante" || subtipo === "protetor"}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-container">
              <input
                type="text"
                name="telefone"
                value={usuario.telefone}
                className="input-field"
                placeholder="Telefone: (__) _____-____"
                onChange={(e) => handleMascaraChange(e, aplicarMascaraTelefone)}
                inputMode="numeric"
                required
              />
            </div>
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
          </div>

          <div className="input-container">
            <input
              type="password"
              name="senha"
              value={usuario.senha}
              className="input-field"
              placeholder="Senha:"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input-field"
              placeholder="Confirme a senha:"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p className="erro-msg">{erro}</p>}

          <button
            type="submit"
            className="btn-enviar"
            style={{ marginTop: "20px" }}
          >
            Próximo →
          </button>
        </form>
      )}

      {/* ── ETAPA 2 ── */}
      {etapa === 2 && (
        <form className="forms-cadastro" onSubmit={handleCadastroSubmit}>
          {/* Foto de perfil */}
          <div className="foto-perfil-container">
            <div
              className="foto-preview"
              onClick={() => document.getElementById("input-foto").click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="foto-preview-img" />
              ) : (
                <div className="foto-placeholder">
                  <span className="foto-icone">📷</span>
                  <span className="foto-texto">Adicionar foto de perfil</span>
                </div>
              )}
            </div>
            <input
              id="input-foto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {preview && (
              <button
                type="button"
                className="btn-trocar-foto"
                onClick={() => document.getElementById("input-foto").click()}
              >
                Trocar foto
              </button>
            )}
          </div>

          {/* CEP + autopreenchimento */}
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
              Cadastrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
