package com.matchpet.backend.dto;

import java.time.LocalDate;

public class AdocaoDTO {

    private Long id_adocao;
    private LocalDate data_adocao;
    private String status;

    // Animal
    private Long id_animal;
    private String nomeAnimal;

    // Usuário (adotante)
    private Long id_usuario;
    private String nomeUsuario;
    private String cpfUsuario;
    private String telefoneUsuario;

    public Long getId_adocao() { return id_adocao; }
    public void setId_adocao(Long id_adocao) { this.id_adocao = id_adocao; }

    public LocalDate getData_adocao() { return data_adocao; }
    public void setData_adocao(LocalDate data_adocao) { this.data_adocao = data_adocao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getId_animal() { return id_animal; }
    public void setId_animal(Long id_animal) { this.id_animal = id_animal; }

    public String getNomeAnimal() { return nomeAnimal; }
    public void setNomeAnimal(String nomeAnimal) { this.nomeAnimal = nomeAnimal; }

    public Long getId_usuario() { return id_usuario; }
    public void setId_usuario(Long id_usuario) { this.id_usuario = id_usuario; }

    public String getNomeUsuario() { return nomeUsuario; }
    public void setNomeUsuario(String nomeUsuario) { this.nomeUsuario = nomeUsuario; }

    public String getCpfUsuario() { return cpfUsuario; }
    public void setCpfUsuario(String cpfUsuario) { this.cpfUsuario = cpfUsuario; }

    public String getTelefoneUsuario() { return telefoneUsuario; }
    public void setTelefoneUsuario(String telefoneUsuario) { this.telefoneUsuario = telefoneUsuario; }
}