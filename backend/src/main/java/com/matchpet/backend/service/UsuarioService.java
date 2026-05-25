package com.matchpet.backend.service;

import com.matchpet.backend.model.Adotante;
import com.matchpet.backend.model.ONG;
import com.matchpet.backend.repository.AdotanteRepository;
import com.matchpet.backend.repository.ONGRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @Autowired
    private ONGRepository ongRepository;

    public Adotante salvarAdotante(Adotante adotante) {
        return adotanteRepository.save(adotante);
    }

    public ONG salvarONG(ONG ong) {
        return ongRepository.save(ong);
    }
}
