package com.matchpet.backend.controller;

import com.matchpet.backend.model.Adocao;
import com.matchpet.backend.service.AdocaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/adocoes")
@CrossOrigin(origins = "*")
public class AdocaoController {

    @Autowired
    private AdocaoService adocaoService;

    @PostMapping
    public ResponseEntity<Adocao> solicitar(@RequestBody Adocao adocao) {
        Adocao novaAdocao = adocaoService.solicitarAdocao(adocao);
        if (novaAdocao != null) {
            return ResponseEntity.ok(novaAdocao);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public List<Adocao> listarTodas() {
        return adocaoService.listarTodas();
    }
}
