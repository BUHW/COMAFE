package com.example.comafe_api.interfaces;

import com.example.comafe_api.domain.products.Products;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductsInterface {

    List<Products> getAll();
    Optional<Products> getById(UUID id);
    Products create(Products products);
    Products Update(UUID id, Products products);
    void delete(UUID id);

}
