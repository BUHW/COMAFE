package com.example.comafe_api.controller;

import com.example.comafe_api.domain.products.Products;
import com.example.comafe_api.repositories.ProductsRepository;
import com.example.comafe_api.service.ProductsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;
    private final ProductsRepository productsRepository;

    public ProductsController(ProductsService productsService, ProductsRepository productsRepository) {
        this.productsService = productsService;
        this.productsRepository = productsRepository;
    }

    @GetMapping
    public List<Products> getAll() {
        return productsService.getAll();
    }

    @PostMapping
    public Products create(@RequestBody Products products) {
        return productsService.create(products);
    }

    @GetMapping("/{id}")
    public Optional<Products> getById(@PathVariable UUID id) {
        return productsService.getById(id);
    }

    @PutMapping("/{id}")
    public Products update(@RequestBody Products products, @PathVariable UUID id) {
        return productsService.Update(id, products);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        productsService.delete(id);
        return ResponseEntity.ok("Produto deletado com sucesso");
    }

}
