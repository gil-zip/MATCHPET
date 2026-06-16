package com.matchpet.backend.service;

import com.matchpet.backend.model.Animal;
import com.matchpet.backend.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> listarTodos() {
        return animalRepository.findAll();
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
