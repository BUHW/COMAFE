package com.example.comafe_api.controller;

import com.example.comafe_api.domain.login.LoginRequestDTO;
import com.example.comafe_api.domain.login.LoginResponseDTO;
import com.example.comafe_api.domain.users.Users;
import com.example.comafe_api.infra.security.TokenService;
import com.example.comafe_api.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        Users user = this.usersRepository.findByUsername(body.username()).orElseThrow(() -> new RuntimeException("Login not found"));
        if ( passwordEncoder.matches(body.password(), user.getPassword()) ) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginResponseDTO(user.getUsername(), token));
        }

        return ResponseEntity.badRequest().build();
    }

}
