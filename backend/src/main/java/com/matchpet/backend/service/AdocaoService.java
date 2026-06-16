package com.matchpet.backend.service;

import com.matchpet.backend.model.Adocao;
import com.matchpet.backend.repository.AdocaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdocaoService {

    @Autowired
    private AdocaoRepository adocaoRepository;

    public List<Adocao> listarTodas() {
        return adocaoRepository.findAll();
    }

    public Adocao salvar(Adocao adocao) {
        return adocaoRepository.save(adocao);
    }
}
