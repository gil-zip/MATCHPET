package com.matchpet.backend.repository;

import com.matchpet.backend.model.ONG;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ONGRepository extends JpaRepository<ONG, Long> {
    Optional<ONG> findByEmail(String email);
}
