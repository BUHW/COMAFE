package com.example.comafe_api.domain.users;

import java.util.UUID;

public record UsersResponseDTO(UUID id, String username, String password, String permission) {
}
