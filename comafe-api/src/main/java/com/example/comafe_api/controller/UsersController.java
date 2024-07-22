package com.example.comafe_api.controller;

import com.example.comafe_api.domain.login.LoginResponseDTO;
import com.example.comafe_api.domain.users.Users;
import com.example.comafe_api.domain.users.UsersRequestDTO;
import com.example.comafe_api.infra.security.TokenService;
import com.example.comafe_api.repositories.UsersRepository;
import com.example.comafe_api.service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public UsersController(UsersService usersService, UsersRepository usersRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.usersService = usersService;
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @GetMapping
    public List<Users> getAll() {
        return usersService.getAll();
    }

    @PostMapping
    public ResponseEntity register(@RequestBody UsersRequestDTO body) {
        Optional<Users> user = this.usersRepository.findByUsername(body.username());

        if(user.isEmpty()) {
            Users newUser = new Users();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setUsername(body.username());
            newUser.setPermission(body.permission());

            this.usersRepository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new LoginResponseDTO(newUser.getUsername(), token));
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public Optional<Users> getById(@PathVariable UUID id) {
        return usersService.getById(id);
    }

    @PutMapping("/{id}")
    public Users update(@PathVariable UUID id, @RequestBody Users users) {
        return usersService.Update(id, users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        usersService.delete(id);
        return ResponseEntity.ok("Usuario deletado com sucesso");
    }

}
