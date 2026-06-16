package com.matchpet.backend.controller;

import com.matchpet.backend.model.Adocao;
import com.matchpet.backend.service.AdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/adocoes")
@CrossOrigin(origins = "*")
public class AdocaoController {

    @Autowired
    private AdocaoService adocaoService;

    @GetMapping
    public List<Adocao> listarTodas() {
        return adocaoService.listarTodas();
    }

    @PostMapping
    public Adocao salvar(@RequestBody Adocao adocao) {
        return adocaoService.salvar(adocao);
    }
}
