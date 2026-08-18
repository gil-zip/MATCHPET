package com.matchpet.backend.repository;

import com.matchpet.backend.model.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
}
