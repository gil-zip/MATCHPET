package com.matchpet.backend.repository;

import com.matchpet.backend.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByStatus(String status);
    List<Animal> findByEspecieAndStatus(String especie, String status);
    List<Animal> findByPorteAndStatus(String porte, String status);
    List<Animal> findByEspecieAndPorteAndStatus(String especie, String porte, String status);
}
