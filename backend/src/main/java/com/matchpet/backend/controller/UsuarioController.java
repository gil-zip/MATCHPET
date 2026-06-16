package com.matchpet.backend.controller;

import com.matchpet.backend.dto.UsuarioDTO;
import com.matchpet.backend.model.Usuario;
import com.matchpet.backend.model.TipoUsuario;
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

    @PostMapping
    public ResponseEntity<Object> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = convertToEntity(usuarioDTO);
            Usuario salvo = usuarioService.salvarUsuario(usuario);
            return ResponseEntity.ok(convertToDTO(salvo));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Método PUT atualizado para preservar o endereço e a senha antiga do banco
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarUsuario(@PathVariable("id") Long id, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            usuarioDTO.setId_usuario(id);
            
            // 1. Converte os dados novos vindos do Front-End
            Usuario usuarioDadosNovos = convertToEntity(usuarioDTO);
            
            // 2. Busca o registro atual direto do banco de dados
            Usuario usuarioExistente = usuarioService.buscarPorId(id); 
            
            if (usuarioExistente != null) {
                // 3. Reatribui o endereço antigo para não quebrar o vínculo
                usuarioDadosNovos.setEndereco(usuarioExistente.getEndereco());
                
                // 4. Se o usuário não digitou uma nova senha, mantém a que já estava no banco
                if (usuarioDadosNovos.getSenha() == null || usuarioDadosNovos.getSenha().isEmpty()) {
                    usuarioDadosNovos.setSenha(usuarioExistente.getSenha());
                }
            }
            
            // 5. Salva o objeto mesclado com sucesso
            Usuario atualizado = usuarioService.salvarUsuario(usuarioDadosNovos);
            
            return ResponseEntity.ok(convertToDTO(atualizado));
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
        dto.setEmail(entity.getSenha()); // Mantido conforme estrutura original
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