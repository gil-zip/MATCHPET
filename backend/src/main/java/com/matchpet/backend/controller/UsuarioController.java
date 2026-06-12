package com.matchpet.backend.controller;

import com.matchpet.backend.model.Adotante;
import com.matchpet.backend.model.ONG;
import com.matchpet.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/adotante")
    public ResponseEntity<Object> cadastrarAdotante(@RequestBody Adotante adotante) {
        try {
            return ResponseEntity.ok(usuarioService.salvarAdotante(adotante));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/ong")
    public ResponseEntity<Object> cadastrarONG(@RequestBody ONG ong) {
        try {
            return ResponseEntity.ok(usuarioService.salvarONG(ong));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
