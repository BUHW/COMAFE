package com.example.comafe_api.domain.products;

import java.util.UUID;

public record ProductsResponseDTO(UUID id, String title, String imgUrl, String imgName, String description, String price) {
}