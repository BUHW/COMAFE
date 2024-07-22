package com.example.comafe_api.repositories;

import com.example.comafe_api.domain.products.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductsRepository extends JpaRepository<Products, UUID> {
}
