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
        if (adotanteRepository.existsById(adotante.getCpf())) {
            throw new RuntimeException("Já existe um adotante cadastrado com este CPF.");
        }
        if (adotanteRepository.findByEmail(adotante.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }
        return adotanteRepository.save(adotante);
    }

    public ONG salvarONG(ONG ong) {
        if (ong.getCnpj() != null && !ong.getCnpj().isEmpty()) {
            if (ongRepository.findAll().stream().anyMatch(o -> ong.getCnpj().equals(o.getCnpj()))) {
                throw new RuntimeException("Já existe uma ONG cadastrada com este CNPJ.");
            }
        }
        if (ong.getCpf() != null && !ong.getCpf().isEmpty()) {
            if (ongRepository.findAll().stream().anyMatch(o -> ong.getCpf().equals(o.getCpf()))) {
                throw new RuntimeException("Já existe um protetor cadastrado com este CPF.");
            }
        }
        if (ongRepository.findByEmail(ong.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }
        return ongRepository.save(ong);
    }
}
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
