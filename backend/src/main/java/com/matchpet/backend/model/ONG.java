package com.matchpet.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ong")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ONG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_ong;

    private String nome;

    @Column(unique = true)
    private String email;

    private String senha;
    private String telefone;

    @Column(unique = true)
    private String cnpj;

    @Column(unique = true)
    private String cpf; // Para protetores independentes

    private String tp_cadastro; // 'ONG' ou 'PROTETOR'

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco", referencedColumnName = "id_endereco")
    private Endereco endereco;
}
