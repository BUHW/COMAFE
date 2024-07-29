package com.example.comafe_api.domain.products;

import org.springframework.web.multipart.MultipartFile;

public record ProductsRequestDTO(String title, MultipartFile img, String description, String price) {
}