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

    private LocalDate data_adocao;

    @ManyToOne
    @JoinColumn(name = "id_animal", referencedColumnName = "id_animal")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "id_adotante", referencedColumnName = "cpf")
    private Adotante adotante;
}
