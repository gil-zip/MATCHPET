package com.matchpet.backend.controller;

import com.matchpet.backend.model.Animal;
import com.matchpet.backend.service.AnimalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/animais")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public List<Animal> listarTodos() {
        return animalService.listarTodos();
    }

    @GetMapping("/disponiveis")
    public List<Animal> listarDisponiveis(
            @RequestParam(required = false) String especie,
            @RequestParam(required = false) String porte) {
        return animalService.listarDisponiveis(especie, porte);
    }

    @PostMapping
    public ResponseEntity<Animal> cadastrar(@Valid @RequestBody Animal animal) {
        return ResponseEntity.ok(animalService.salvar(animal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> atualizar(@PathVariable Long id, @Valid @RequestBody Animal animal) {
        Animal atualizado = animalService.atualizar(id, animal);
        if (atualizado != null) {
            return ResponseEntity.ok(atualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        animalService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
