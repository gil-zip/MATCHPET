package com.matchpet.backend.repository;

import com.matchpet.backend.model.Adotante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdotanteRepository extends JpaRepository<Adotante, String> {
    Optional<Adotante> findByEmail(String email);
}
