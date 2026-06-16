package com.matchpet.backend.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "O nome é obrigatório")
    @Column(length = 100)
    private String nome;

    @NotBlank(message = "A espécie é obrigatória")
    @Column(nullable = false, length = 50)
    private String especie;

    @Column(length = 50)
    private String raca;

    private Integer idade;

    @NotBlank(message = "O porte é obrigatório")
    @Column(length = 20)
    private String porte;

    @NotBlank(message = "O status é obrigatório")
    @Column(nullable = false, length = 30)
    private String status; // disponível, adotado ou em andamento

    @Column(columnDefinition = "TEXT")
    private String especificidades;

    @Lob
    @Column(name = "imagem", columnDefinition = "MEDIUMBLOB")
    private byte[] imagem;

    @ManyToOne
    @JoinColumn(name = "id_ong", referencedColumnName = "id_usuario", nullable = false)
    private Usuario ong;
}
