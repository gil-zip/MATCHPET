package com.matchpet.backend.controller;

import com.matchpet.backend.model.Endereco;
import com.matchpet.backend.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enderecos")
@CrossOrigin(origins = "*")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> atualizar(@PathVariable Long id, @RequestBody Endereco novoEndereco) {
        return enderecoRepository.findById(id)
                .map(endereco -> {
                    endereco.setCep(novoEndereco.getCep());
                    endereco.setEstado(novoEndereco.getEstado());
                    endereco.setCidade(novoEndereco.getCidade());
                    endereco.setBairro(novoEndereco.getBairro());
                    endereco.setRua(novoEndereco.getRua());
                    endereco.setNumero(novoEndereco.getNumero());
                    endereco.setComplemento(novoEndereco.getComplemento());
                    return ResponseEntity.ok(enderecoRepository.save(endereco));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
