package com.matchpet.backend.controller;

import com.matchpet.backend.dto.AdocaoDTO;
import com.matchpet.backend.model.Adocao;
import com.matchpet.backend.service.AdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public AdocaoDTO salvar(@RequestBody Adocao adocao) {
        if (adocao.getStatus() == null) adocao.setStatus("PENDENTE");
        return convertToDTO(adocaoService.salvar(adocao));
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
        }
        return dto;
    }
}
