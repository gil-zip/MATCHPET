package com.matchpet.backend.service;

import com.matchpet.backend.model.Animal;
import com.matchpet.backend.repository.AnimalRepository;
import com.matchpet.backend.repository.AdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AdocaoRepository adocaoRepository;

    public List<Animal> listarTodos() {
        return animalRepository.findAll();
    }

    public List<Animal> listarTodosDisponiveis() {
        List<Animal> todos = animalRepository.findAll();
        List<Long> animaisAdotadosIds = adocaoRepository.findAll().stream()
                .filter(adocao -> "FINALIZADA".equalsIgnoreCase(adocao.getStatus()))
                .map(adocao -> adocao.getAnimal().getId_animal())
                .collect(Collectors.toList());

        return todos.stream()
                .filter(animal -> !animaisAdotadosIds.contains(animal.getId_animal()))
                .collect(Collectors.toList());
    }

    public Animal salvar(Animal animal) {
        return animalRepository.save(animal);
    }

    public Optional<Animal> buscarPorId(Long id) {
        return animalRepository.findById(id);
    }

    public void deletar(Long id) {
        animalRepository.deleteById(id);
    }
}
