package com.example.comafe_api.repositories;

import com.example.comafe_api.domain.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UsersRepository extends JpaRepository<Users,UUID> {

    Optional<Users> findByUsername(String username);

}
