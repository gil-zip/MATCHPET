package com.matchpet.backend.controller;

import com.matchpet.backend.dto.LoginDTO;
import com.matchpet.backend.dto.UsuarioDTO;
import com.matchpet.backend.model.Usuario;
import com.matchpet.backend.service.AuthService;
import com.matchpet.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO loginDTO) {
        Usuario usuario = authService.login(loginDTO.getEmail(), loginDTO.getSenha());
        if (usuario != null) {
            return ResponseEntity.ok(convertToDTO(usuario));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
        }
    }

    private UsuarioDTO convertToDTO(Usuario entity) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId_usuario(entity.getId_usuario());
        dto.setNome(entity.getNome());
        dto.setEmail(entity.getEmail());
        dto.setSenha(entity.getSenha());
        dto.setTelefone(entity.getTelefone());
        dto.setTp_usuario(entity.getTp_usuario());
        dto.setCpf(entity.getCpf());
        dto.setCnpj(entity.getCnpj());
        dto.setEndereco(entity.getEndereco());
        dto.setImagem(usuarioService.converterBytesParaBase64(entity.getImagem()));
        return dto;
    }
}
