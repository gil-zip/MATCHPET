package com.matchpet.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AdocaoDTO {
    private Long id_adocao;
    private LocalDate data_adocao;
    private String status;
    private Long id_animal;
    private String nomeAnimal;
    private Long id_usuario;
    private String nomeUsuario;
    private String cpfUsuario;
}
