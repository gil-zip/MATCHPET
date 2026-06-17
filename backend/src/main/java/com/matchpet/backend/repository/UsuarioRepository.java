package com.matchpet.backend.repository;

import com.matchpet.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByCpf(String cpf);
    Optional<Usuario> findByCnpj(String cnpj);
    Optional<Usuario> findByTelefone(String telefone);
}
