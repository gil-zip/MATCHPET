package com.matchpet.backend.controller;

import com.matchpet.backend.dto.AnimalDTO;
import com.matchpet.backend.model.Animal;
import com.matchpet.backend.model.Usuario;
import com.matchpet.backend.service.AnimalService;
import com.matchpet.backend.service.UsuarioService;
import com.matchpet.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/animais")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<AnimalDTO> listarTodos() {
        return animalService.listarTodos().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<AnimalDTO> salvar(@RequestBody Map<String, Object> payload) {
        AnimalDTO animalDTO = parsePayload(payload);
        Animal animal = convertToEntity(animalDTO);
        Animal salvo = animalService.salvar(animal);
        return ResponseEntity.ok(convertToDTO(salvo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalDTO> atualizar(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        return animalService.buscarPorId(id)
                .map(animal -> {
                    AnimalDTO dto = parsePayload(payload);
                    animal.setNome(dto.getNome());
                    animal.setEspecie(dto.getEspecie());
                    animal.setRaca(dto.getRaca());
                    animal.setIdade(dto.getIdade());
                    animal.setPorte(dto.getPorte());
                    animal.setEspecificidades(dto.getEspecificidades());
                    if (dto.getImagem() != null) {
                        animal.setImagem(usuarioService.converterBase64ParaBytes(dto.getImagem()));
                    }
                    Animal atualizado = animalService.salvar(animal);
                    return ResponseEntity.ok(convertToDTO(atualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalDTO> buscarPorId(@PathVariable Long id) {
        return animalService.buscarPorId(id)
                .map(animal -> ResponseEntity.ok(convertToDTO(animal)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        animalService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    private AnimalDTO parsePayload(Map<String, Object> payload) {
        AnimalDTO animalDTO = new AnimalDTO();
        animalDTO.setId_animal(payload.get("id_animal") != null ? Long.valueOf(payload.get("id_animal").toString()) : null);
        animalDTO.setNome((String) payload.get("nome"));
        animalDTO.setEspecie((String) payload.get("especie"));
        animalDTO.setRaca((String) payload.get("raca"));
        animalDTO.setIdade(payload.get("idade") != null ? Integer.valueOf(payload.get("idade").toString()) : null);
        animalDTO.setPorte((String) payload.get("porte"));
        animalDTO.setEspecificidades((String) payload.get("especificidades"));
        animalDTO.setImagem((String) payload.get("imagem"));

        if (payload.get("id_ong") != null) {
            animalDTO.setId_ong(Long.valueOf(payload.get("id_ong").toString()));
        } else if (payload.get("ong") != null) {
            Map<String, Object> ongMap = (Map<String, Object>) payload.get("ong");
            if (ongMap.get("id_ong") != null) {
                animalDTO.setId_ong(Long.valueOf(ongMap.get("id_ong").toString()));
            } else if (ongMap.get("id_usuario") != null) {
                animalDTO.setId_ong(Long.valueOf(ongMap.get("id_usuario").toString()));
            }
        }
        return animalDTO;
    }

    private Animal convertToEntity(AnimalDTO dto) {
        Animal entity = new Animal();
        entity.setId_animal(dto.getId_animal());
        entity.setNome(dto.getNome());
        entity.setEspecie(dto.getEspecie());
        entity.setRaca(dto.getRaca());
        entity.setIdade(dto.getIdade());
        entity.setPorte(dto.getPorte());
        entity.setEspecificidades(dto.getEspecificidades());
        entity.setImagem(usuarioService.converterBase64ParaBytes(dto.getImagem()));

        if (dto.getId_ong() != null) {
            Usuario ong = usuarioRepository.findById(dto.getId_ong())
                    .orElseThrow(() -> new RuntimeException("ONG não encontrada"));
            entity.setOng(ong);
        }
        return entity;
    }

    private AnimalDTO convertToDTO(Animal entity) {
        AnimalDTO dto = new AnimalDTO();
        dto.setId_animal(entity.getId_animal());
        dto.setNome(entity.getNome());
        dto.setEspecie(entity.getEspecie());
        dto.setRaca(entity.getRaca());
        dto.setIdade(entity.getIdade());
        dto.setPorte(entity.getPorte());
        dto.setEspecificidades(entity.getEspecificidades());
        dto.setImagem(usuarioService.converterBytesParaBase64(entity.getImagem()));
        if (entity.getOng() != null) {
            dto.setId_ong(entity.getOng().getId_usuario());
        }
        return dto;
    }
}
