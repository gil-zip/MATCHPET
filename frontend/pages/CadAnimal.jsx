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
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemBase64(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogado || !usuarioLogado.id_ong) {
      alert("Você precisa estar logado como uma ONG ou Protetor para cadastrar um animal.");
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
      imagem: imagemBase64, // Enviando a imagem em base64
      ong: {
        id_ong: usuarioLogado.id_ong
      }
    };

    try {
      await api.post("/animais", dataToSend);
      alert("Animal cadastrado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      alert("Erro ao cadastrar animal. Verifique os dados e tente novamente.");
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

        <form onSubmit={handleSubmit} className="animal-form">
          <div className="animal-row">
            <div className="animal-col">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome:"
                className="animal-input-field"
                required
              />
            </div>
            <div className="animal-col">
              <select
                name="especie"
                value={formData.especie}
                onChange={handleInputChange}
                className="animal-input-field"
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

          <div className="animal-row">
            <div className="animal-col">
              <input
                type="text"
                name="raca"
                value={formData.raca}
                onChange={handleInputChange}
                placeholder="Raça:"
                className="animal-input-field"
              />
            </div>
            <div className="animal-col">
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleInputChange}
                placeholder="Idade:"
                className="animal-input-field"
              />
            </div>
            <div className="animal-col">
              <select
                name="porte"
                value={formData.porte}
                onChange={handleInputChange}
                className="animal-input-field"
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

          <div className="animal-row">
            <textarea
              rows="6"
              name="especificidades"
              value={formData.especificidades}
              onChange={handleInputChange}
              className="animal-textarea"
              placeholder="Especificidades / Descrição (opcional)"
            ></textarea>
          </div>

          <div className="animal-row animal-buttons">
            <div className="animal-col">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={handleButtonClick}
                className="btn-animal-action btn-foto"
                style={{ backgroundColor: imagemBase64 ? "#4CAF50" : "" }}
              >
                {imagemBase64 ? "Foto Selecionada ✓" : "Foto"}
              </button>
            </div>

            <div className="animal-col">
              <button type="submit" className="btn-animal-action btn-salvar">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
import React, { useState, useRef } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./CadAnimal.css";
import api from "../api/api";

export default function CadAnimal() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: "",
    porte: "",
    descricao: "",
  });

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setSucesso(false);
    setLoading(true);

    const idOng = localStorage.getItem("id_ong");

    try {
      await api.post("/animais", {
        nome: formData.nome,
        especie: formData.especie,
        raca: formData.raca,
        idade: Number(formData.idade),
        porte: formData.porte,
        especificidades: formData.descricao,
        ong: { id_ong: Number(idOng) },
      });

      setSucesso(true);
      setFormData({
        nome: "",
        especie: "",
        raca: "",
        idade: "",
        porte: "",
        descricao: "",
      });
      setFile(null);
    } catch (err) {
      setErro("Erro ao cadastrar animal. Tente novamente.");
    } finally {
      setLoading(false);
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

        <form onSubmit={handleSubmit} className="animal-form">
          <div className="animal-row">
            <div className="animal-col">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome:"
                className="animal-input-field"
                required
              />
            </div>
            <div className="animal-col">
              <select
                name="especie"
                value={formData.especie}
                onChange={handleInputChange}
                className="animal-input-field"
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

          <div className="animal-row">
            <div className="animal-col">
              <input
                type="text"
                name="raca"
                value={formData.raca}
                onChange={handleInputChange}
                placeholder="Raça:"
                className="animal-input-field"
                required
              />
            </div>
            <div className="animal-col">
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleInputChange}
                placeholder="Idade:"
                className="animal-input-field"
                min="0"
                max="30"
                required
              />
            </div>
            <div className="animal-col">
              <select
                name="porte"
                value={formData.porte}
                onChange={handleInputChange}
                className="animal-input-field"
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

          <div className="animal-row">
            <textarea
              rows="6"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="animal-textarea"
              placeholder="Descrição (opcional)"
            />
          </div>

          {erro && <p className="erro">{erro}</p>}
          {sucesso && <p className="sucesso">Animal cadastrado com sucesso!</p>}

          <div className="animal-row animal-buttons">
            <div className="animal-col">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={handleButtonClick}
                className="btn-animal-action btn-foto"
              >
                {file ? `Selecionado: ${file.name}` : "Foto"}
              </button>
            </div>

            <div className="animal-col">
              <button
                type="submit"
                className="btn-animal-action btn-salvar"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
