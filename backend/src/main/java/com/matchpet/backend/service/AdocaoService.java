package com.matchpet.backend.service;

import com.matchpet.backend.model.Adocao;
import com.matchpet.backend.model.Animal;
import com.matchpet.backend.repository.AdocaoRepository;
import com.matchpet.backend.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class AdocaoService {

    @Autowired
    private AdocaoRepository adocaoRepository;

    @Autowired
    private AnimalRepository animalRepository;

    public Adocao solicitarAdocao(Adocao adocao) {
        // Busca o animal e atualiza o status para 'em andamento'
        Animal animal = animalRepository.findById(adocao.getAnimal().getId_animal()).orElse(null);
        if (animal != null && "disponível".equals(animal.getStatus())) {
            animal.setStatus("em andamento");
            animalRepository.save(animal);
            adocao.setData_adocao(LocalDate.now());
            return adocaoRepository.save(adocao);
        }
        return null;
    }

    public List<Adocao> listarTodas() {
        return adocaoRepository.findAll();
    }
}
