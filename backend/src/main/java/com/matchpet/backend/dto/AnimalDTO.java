package com.matchpet.backend.dto;

import lombok.Data;

@Data
public class AnimalDTO {
    private Long id_animal;
    private String nome;
    private String especie;
    private String raca;
    private Integer idade;
    private String porte;
    private String especificidades;
    private String imagem; // Base64
    private Long id_ong;
}
