package com.matchpet.backend.controller;

import com.matchpet.backend.dto.UsuarioDTO;
import com.matchpet.backend.model.Usuario;
import com.matchpet.backend.model.TipoUsuario;
import com.matchpet.backend.repository.UsuarioRepository;
import com.matchpet.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<Object> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = convertToEntity(usuarioDTO);
            Usuario salvo = usuarioService.salvarUsuario(usuario);
            return ResponseEntity.ok((Object) convertToDTO(salvo));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(u -> ResponseEntity.ok((Object) convertToDTO(u)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            return usuarioRepository.findById(id)
                    .map(usuario -> {
                        usuario.setNome(usuarioDTO.getNome());
                        usuario.setEmail(usuarioDTO.getEmail());
                        usuario.setSenha(usuarioDTO.getSenha());
                        usuario.setTelefone(usuarioDTO.getTelefone());
                        usuario.setCpf(usuarioDTO.getCpf());
                        usuario.setCnpj(usuarioDTO.getCnpj());
                        if (usuarioDTO.getImagem() != null) {
                            usuario.setImagem(usuarioService.converterBase64ParaBytes(usuarioDTO.getImagem()));
                        }
                        Usuario atualizado = usuarioService.salvarUsuario(usuario);
                        return ResponseEntity.ok((Object) convertToDTO(atualizado));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Compatibilidade com frontend atual de Adotante
    @PostMapping("/adotante")
    public ResponseEntity<Object> cadastrarAdotante(@RequestBody Map<String, Object> payload) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setNome((String) payload.get("nome"));
        dto.setCpf((String) payload.get("cpf"));
        dto.setTelefone((String) payload.get("telefone"));
        dto.setEmail((String) payload.get("email"));
        dto.setSenha((String) payload.get("senha"));
        dto.setImagem((String) payload.get("imagem"));
        dto.setTp_usuario(TipoUsuario.ADOTANTE);
        return cadastrarUsuario(dto);
    }

    // Compatibilidade com frontend atual de ONG/Protetor
    @PostMapping("/ong")
    public ResponseEntity<Object> cadastrarONG(@RequestBody Map<String, Object> payload) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setNome((String) payload.get("nome"));
        dto.setEmail((String) payload.get("email"));
        dto.setSenha((String) payload.get("senha"));
        dto.setTelefone((String) payload.get("telefone"));
        dto.setCnpj((String) payload.get("cnpj"));
        dto.setCpf((String) payload.get("cpf"));
        dto.setImagem((String) payload.get("imagem"));

        String tpStr = (String) payload.get("tp_cadastro");
        if ("PROTETOR".equals(tpStr)) {
            dto.setTp_usuario(TipoUsuario.INDEPENDENTE);
        } else {
            dto.setTp_usuario(TipoUsuario.ONG);
        }

        return cadastrarUsuario(dto);
    }

    private Usuario convertToEntity(UsuarioDTO dto) {
        Usuario entity = new Usuario();
        entity.setId_usuario(dto.getId_usuario());
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setSenha(dto.getSenha());
        entity.setTelefone(dto.getTelefone());
        entity.setTp_usuario(dto.getTp_usuario());
        entity.setCpf(dto.getCpf());
        entity.setCnpj(dto.getCnpj());
        entity.setEndereco(dto.getEndereco());
        entity.setImagem(usuarioService.converterBase64ParaBytes(dto.getImagem()));
        return entity;
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