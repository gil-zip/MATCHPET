package com.matchpet.backend.service;

import com.matchpet.backend.model.Usuario;
import com.matchpet.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvarUsuario(Usuario usuario) {
        validarUnicidade(usuario);
        return usuarioRepository.save(usuario);
    }

    private void validarUnicidade(Usuario usuario) {
        if (usuario.getEmail() != null && usuarioRepository.findByEmail(usuario.getEmail())
                .filter(u -> !u.getId_usuario().equals(usuario.getId_usuario())).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }
        if (usuario.getCpf() != null && !usuario.getCpf().isEmpty() && usuarioRepository.findByCpf(usuario.getCpf())
                .filter(u -> !u.getId_usuario().equals(usuario.getId_usuario())).isPresent()) {
            throw new RuntimeException("CPF já cadastrado.");
        }
        if (usuario.getCnpj() != null && !usuario.getCnpj().isEmpty() && usuarioRepository.findByCnpj(usuario.getCnpj())
                .filter(u -> !u.getId_usuario().equals(usuario.getId_usuario())).isPresent()) {
            throw new RuntimeException("CNPJ já cadastrado.");
        }
        if (usuario.getTelefone() != null && !usuario.getTelefone().isEmpty() && usuarioRepository.findByTelefone(usuario.getTelefone())
                .filter(u -> !u.getId_usuario().equals(usuario.getId_usuario())).isPresent()) {
            throw new RuntimeException("Telefone já cadastrado.");
        }
    }

    public byte[] converterBase64ParaBytes(String base64) {
        if (base64 == null || base64.isEmpty()) return null;
        try {
            String cleanBase64 = base64;
            if (base64.contains(",")) {
                cleanBase64 = base64.split(",")[1];
            }
            return Base64.getDecoder().decode(cleanBase64);
        } catch (Exception e) {
            return null;
        }
    }

    public String converterBytesParaBase64(byte[] bytes) {
        if (bytes == null || bytes.length == 0) return null;
        return "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
    }
}
