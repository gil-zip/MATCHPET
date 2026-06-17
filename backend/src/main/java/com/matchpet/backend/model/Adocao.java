package com.matchpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "adocao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adocao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_adocao;

    @Column(nullable = true) // nula até a adoção ser concluída
    private LocalDate data_adocao;

    @Column(nullable = false, length = 30)
    private String status; // PENDENTE, EM_ANDAMENTO, FINALIZADA

    @ManyToOne
    @JoinColumn(name = "id_animal", referencedColumnName = "id_animal", nullable = false)
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario", nullable = false)
    private Usuario usuario;
}