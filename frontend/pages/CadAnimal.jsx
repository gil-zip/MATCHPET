import React, { useState, useRef } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./CadAnimal.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CadAnimal() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: "",
    porte: "",
    especificidades: "",
  });

  const [imagemBase64, setImagemBase64] = useState("");
  const [preview, setPreview] = useState(null);
  const [erro, setErro] = useState("");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemBase64(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogado || usuarioLogado.tp_usuario === "ADOTANTE") {
      setErro(
        "Apenas ONGs e Protetores Independentes podem cadastrar animais.",
      );
      return;
    }

    const dataToSend = {
      nome: formData.nome,
      especie: formData.especie,
      raca: formData.raca,
      idade: parseInt(formData.idade),
      porte: formData.porte,
      especificidades: formData.especificidades,
      status: "disponível",
      imagem: imagemBase64,
      ong: {
        id_ong: usuarioLogado.id_usuario,
      },
    };

    try {
      await api.post("/animais", dataToSend);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      const mensagem =
        error.response?.data ||
        "Erro ao cadastrar animal. Verifique os dados e tente novamente.";
      setErro(mensagem);
    }
  };

  return (
    <>
      <Navbar onOpenMenu={() => setMenuAberto(true)} />
      <MenuLateral
        isOpen={menuAberto}
        onCloseMenu={() => setMenuAberto(false)}
      />

      <div className="container-animal-page">
        <h1 className="title">Cadastro de Animal</h1>

        <form onSubmit={handleSubmit} className="forms-animal">
          {/* ── Foto do animal ── */}
          <div className="foto-animal-container">
            <div
              className="foto-animal-preview"
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview do animal"
                  className="foto-animal-preview-img"
                />
              ) : (
                <div className="foto-animal-placeholder">
                  <span className="foto-animal-icone">🐾</span>
                  <span className="foto-animal-texto">
                    Adicionar foto do animal
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            {preview && (
              <button
                type="button"
                className="btn-trocar-foto-animal"
                onClick={() => fileInputRef.current.click()}
              >
                Trocar foto
              </button>
            )}
          </div>

          {/* ── Nome + Espécie ── */}
          <div className="form-row">
            <div className="input-container">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome:"
                className="input-field"
                required
              />
            </div>
            <div className="input-container">
              <select
                name="especie"
                value={formData.especie}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="" disabled>
                  Espécie
                </option>
                <option value="Gato">Gato</option>
                <option value="Cachorro">Cachorro</option>
              </select>
            </div>
          </div>

          {/* ── Raça + Idade + Porte ── */}
          <div className="form-row">
            <div className="input-container">
              <input
                type="text"
                name="raca"
                value={formData.raca}
                onChange={handleInputChange}
                placeholder="Raça:"
                className="input-field"
              />
            </div>
            <div className="input-container">
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleInputChange}
                placeholder="Idade (anos):"
                className="input-field"
                min="0"
              />
            </div>
            <div className="input-container">
              <select
                name="porte"
                value={formData.porte}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="" disabled>
                  Porte
                </option>
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          </div>

          {/* ── Descrição ── */}
          <div className="input-container">
            <textarea
              rows="5"
              name="especificidades"
              value={formData.especificidades}
              onChange={handleInputChange}
              className="animal-textarea"
              placeholder="Especificidades / Descrição (opcional)"
            />
          </div>

          {erro && <p className="erro-msg">{erro}</p>}

          {/* ── Botões ── */}
          <div className="botoes-row">
            <button
              type="button"
              className="btn-voltar-animal"
              onClick={() => navigate(-1)}
            >
              ← Voltar
            </button>
            <button type="submit" className="btn-enviar">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
