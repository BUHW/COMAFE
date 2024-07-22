package com.example.comafe_api.service;

import com.example.comafe_api.domain.users.Users;
import com.example.comafe_api.exception.UsersNotFoundException;
import com.example.comafe_api.interfaces.UserInterface;
import com.example.comafe_api.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService implements UserInterface {

    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Users> getAll() {
        Sort.Order order = Sort.Order.asc("username");
        Sort sort = Sort.by(order);

        return usersRepository.findAll(sort);
    }

    @Override
    public Optional<Users> getById(UUID id) {
        return usersRepository.findById(id);
    }

    @Override
    public Users Update(UUID id, Users users) {
        Users usersUpdate = usersRepository.findById(id).orElseThrow(UsersNotFoundException::new);

        usersUpdate.setUsername(users.getUsername());
        usersUpdate.setPassword(passwordEncoder.encode(users.getPassword()));
        usersUpdate.setPermission(users.getPermission());

        return usersRepository.save(usersUpdate);
    }

    @Override
    public void delete(UUID id) {
        usersRepository.deleteById(id);
    }
}
