package com.matchpet.backend.service;

import com.matchpet.backend.model.Animal;
import com.matchpet.backend.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> listarTodos() {
        return animalRepository.findAll();
    }

    public List<Animal> listarDisponiveis(String especie, String porte) {
        if (especie != null && porte != null) {
            return animalRepository.findByEspecieAndPorteAndStatus(especie, porte, "disponível");
        } else if (especie != null) {
            return animalRepository.findByEspecieAndStatus(especie, "disponível");
        } else if (porte != null) {
            return animalRepository.findByPorteAndStatus(porte, "disponível");
        }
        return animalRepository.findByStatus("disponível");
    }

    public Animal salvar(Animal animal) {
        if (animal.getStatus() == null) {
            animal.setStatus("disponível");
        }
        return animalRepository.save(animal);
    }

    public Animal atualizar(Long id, Animal animalAtualizado) {
        return animalRepository.findById(id)
            .map(animal -> {
                animal.setNome(animalAtualizado.getNome());
                animal.setEspecie(animalAtualizado.getEspecie());
                animal.setRaca(animalAtualizado.getRaca());
                animal.setIdade(animalAtualizado.getIdade());
                animal.setPorte(animalAtualizado.getPorte());
                animal.setStatus(animalAtualizado.getStatus());
                animal.setEspecificidades(animalAtualizado.getEspecificidades());
                return animalRepository.save(animal);
            }).orElse(null);
    }

    public void deletar(Long id) {
        animalRepository.deleteById(id);
    }

    public Animal buscarPorId(Long id) {
        return animalRepository.findById(id).orElse(null);
    }
}
