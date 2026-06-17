package com.matchpet.backend.controller;

import com.matchpet.backend.dto.AdocaoDTO;
import com.matchpet.backend.dto.AdocaoRequestDTO;
import com.matchpet.backend.model.Adocao;
import com.matchpet.backend.model.Animal;
import com.matchpet.backend.model.Usuario;
import com.matchpet.backend.service.AdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AdocaoController {

    @Autowired
    private AdocaoService adocaoService;

    @GetMapping("/adocoes")
    public List<AdocaoDTO> listarTodas() {
        return adocaoService.listarTodas().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/adocoes")
    public AdocaoDTO salvar(@RequestBody AdocaoRequestDTO request) {
        Animal animal = new Animal();
        animal.setId_animal(request.getId_animal());

        Usuario usuario = new Usuario();
        usuario.setId_usuario(request.getId_usuario());

        Adocao adocao = new Adocao();
        adocao.setAnimal(animal);
        adocao.setUsuario(usuario);
        adocao.setStatus("PENDENTE");
        adocao.setData_adocao(null);

        return convertToDTO(adocaoService.salvar(adocao));
    }

    // Atualiza o status de uma adoção (ex: PENDENTE → EM_ANDAMENTO)
    @PatchMapping("/adocoes/{id}/status")
    public AdocaoDTO atualizarStatus(@PathVariable Long id,
                                     @RequestBody Map<String, String> body) {
        String novoStatus = body.get("status");
        Adocao adocao = adocaoService.buscarPorId(id);
        adocao.setStatus(novoStatus);
        return convertToDTO(adocaoService.salvar(adocao));
    }

    // Cancela (exclui) uma solicitação de adoção
    @DeleteMapping("/adocoes/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        adocaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/solicitacoes")
    public Map<String, List<Map<String, Object>>> listarSolicitacoes() {
        List<Adocao> todas = adocaoService.listarTodas();

        Map<String, List<Map<String, Object>>> resultado = new HashMap<>();

        resultado.put("pendentes", todas.stream()
                .filter(a -> "PENDENTE".equalsIgnoreCase(a.getStatus()))
                .map(this::mapToSolicitacao)
                .collect(Collectors.toList()));

        resultado.put("andamento", todas.stream()
                .filter(a -> "EM_ANDAMENTO".equalsIgnoreCase(a.getStatus()))
                .map(this::mapToSolicitacao)
                .collect(Collectors.toList()));

        return resultado;
    }

    private Map<String, Object> mapToSolicitacao(Adocao adocao) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", adocao.getId_adocao());
        map.put("adotante", adocao.getUsuario() != null ? adocao.getUsuario().getNome() : "Desconhecido");
        map.put("cpf", adocao.getUsuario() != null ? adocao.getUsuario().getCpf() : "");
        map.put("codigoAnimal", adocao.getAnimal() != null ? adocao.getAnimal().getId_animal() : "");
        return map;
    }

    private AdocaoDTO convertToDTO(Adocao entity) {
        AdocaoDTO dto = new AdocaoDTO();
        dto.setId_adocao(entity.getId_adocao());
        dto.setData_adocao(entity.getData_adocao());
        dto.setStatus(entity.getStatus());
        if (entity.getAnimal() != null) {
            dto.setId_animal(entity.getAnimal().getId_animal());
            dto.setNomeAnimal(entity.getAnimal().getNome());
        }
        if (entity.getUsuario() != null) {
            dto.setId_usuario(entity.getUsuario().getId_usuario());
            dto.setNomeUsuario(entity.getUsuario().getNome());
            dto.setCpfUsuario(entity.getUsuario().getCpf());
            dto.setTelefoneUsuario(entity.getUsuario().getTelefone());
        }
        return dto;
    }
}