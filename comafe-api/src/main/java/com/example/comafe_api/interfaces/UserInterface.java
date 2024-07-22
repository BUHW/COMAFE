package com.example.comafe_api.interfaces;

import com.example.comafe_api.domain.users.Users;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserInterface {

    List<Users> getAll();
    Optional<Users> getById(UUID id);
    Users Update(UUID id, Users users);
    void delete(UUID id);

}
