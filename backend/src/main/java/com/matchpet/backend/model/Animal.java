package com.matchpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "animal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_animal;

    private String nome;
    private String especie;
    private String raca;
    private Integer idade;
    private String porte;
    private String status; // disponível, adotado ou em andamento
    private String especificidades;

    @ManyToOne
    @JoinColumn(name = "id_ong", referencedColumnName = "id_ong")
    private ONG ong;
}
