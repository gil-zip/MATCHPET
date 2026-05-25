package com.matchpet.backend.service;

import com.matchpet.backend.model.Adotante;
import com.matchpet.backend.model.ONG;
import com.matchpet.backend.repository.AdotanteRepository;
import com.matchpet.backend.repository.ONGRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @Autowired
    private ONGRepository ongRepository;

    public Object login(String email, String senha) {
        // Tenta encontrar em Adotante
        Optional<Adotante> adotante = adotanteRepository.findByEmail(email);
        if (adotante.isPresent() && adotante.get().getSenha().equals(senha)) {
            return adotante.get();
        }

        // Tenta encontrar em ONG/Protetor
        Optional<ONG> ong = ongRepository.findByEmail(email);
        if (ong.isPresent() && ong.get().getSenha().equals(senha)) {
            return ong.get();
        }

        return null;
    }
}
