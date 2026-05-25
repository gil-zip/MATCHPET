package com.matchpet.backend.controller;

import com.matchpet.backend.model.Adotante;
import com.matchpet.backend.model.ONG;
import com.matchpet.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/adotante")
    public ResponseEntity<Adotante> cadastrarAdotante(@RequestBody Adotante adotante) {
        return ResponseEntity.ok(usuarioService.salvarAdotante(adotante));
    }

    @PostMapping("/ong")
    public ResponseEntity<ONG> cadastrarONG(@RequestBody ONG ong) {
        // Serve tanto para ONG quanto para Protetor, diferenciado pelo tp_cadastro
        return ResponseEntity.ok(usuarioService.salvarONG(ong));
    }
}
