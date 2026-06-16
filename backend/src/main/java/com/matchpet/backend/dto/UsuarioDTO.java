package com.matchpet.backend.dto;

import com.matchpet.backend.model.Endereco;
import com.matchpet.backend.model.TipoUsuario;
import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id_usuario;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private TipoUsuario tp_usuario;
    private String cpf;
    private String cnpj;
    private Endereco endereco;
    private String imagem; // Base64
}
