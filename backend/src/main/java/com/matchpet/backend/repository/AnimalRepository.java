package com.matchpet.backend.repository;

import com.matchpet.backend.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByEspecie(String especie);
    List<Animal> findByPorte(String porte);
    List<Animal> findByEspecieAndPorte(String especie, String porte);
}
