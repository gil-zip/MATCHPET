import React, { useState, useRef } from "react";
import Navbar from "./Navbar.jsx";
import MenuLateral from "./MenuLateral";
import "./CadAnimal.css";

export default function CadAnimal() {
  const [menuAberto, setMenuAberto] = useState(false);

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
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("nome", formData.nome);
    dataToSend.append("especie", formData.especie);
    dataToSend.append("raca", formData.raca);
    dataToSend.append("idade", formData.idade);
    dataToSend.append("porte", formData.porte);
    dataToSend.append("descricao", formData.descricao);

    if (file) {
      dataToSend.append("image", file);
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

        {/* Adicionado o onSubmit aqui */}
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
              />
            </div>
            <div className="animal-col">
              <select name="especie" id="" className="animal-input-field">
                <option value="" disabled selected>
                  Espécie
                </option>
                <option value="gato">Gato</option>
                <option value="gato">Cachorro</option>
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
                type="text"
                name="idade"
                value={formData.idade}
                onChange={handleInputChange}
                placeholder="Idade:"
                className="animal-input-field"
              />
            </div>
            <div className="animal-col">
              <select name="especie" id="" className="animal-input-field">
                <option value="" disabled selected>
                  Porte
                </option>
                <option value="gato">Pequeno</option>
                <option value="gato">Médio</option>
                <option value="gato">Grande</option>
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
            ></textarea>
          </div>

          <div className="animal-row animal-buttons">
            <div className="animal-col">
              {/* Input real escondido */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              {/* Botão falso que o usuário interage */}
              <button
                type="button"
                onClick={handleButtonClick}
                className="btn-animal-action btn-foto"
              >
                {file ? `Selecionado: ${file.name}` : "Foto"}
              </button>
            </div>

            <div className="animal-col">
              {/* Esse botão dispara o onSubmit do form */}
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
