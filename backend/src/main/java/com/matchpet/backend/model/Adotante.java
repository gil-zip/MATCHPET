package com.matchpet.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "adotante")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adotante {

    @Id
    private String cpf; // PK conforme solicitado

    private String nome;
    private String telefone;
    private String email;
    private String senha;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco", referencedColumnName = "id_endereco")
    private Endereco endereco;
}
