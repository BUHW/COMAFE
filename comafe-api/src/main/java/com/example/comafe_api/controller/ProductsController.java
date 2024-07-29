package com.example.comafe_api.controller;

import com.example.comafe_api.domain.products.Products;
import com.example.comafe_api.domain.products.ProductsRequestDTO;
import com.example.comafe_api.domain.products.ProductsResponseDTO;
import com.example.comafe_api.service.ProductsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;

    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @GetMapping
    public List<ProductsResponseDTO> getAll() {
        return productsService.getAll().stream()
                .map(product -> new ProductsResponseDTO(
                        product.getId(),
                        product.getTitle(),
                        product.getImgUrl(),
                        product.getImgName(), // Novo campo
                        product.getDescription(),
                        product.getPrice()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ProductsResponseDTO create(@ModelAttribute ProductsRequestDTO productRequest) {
        Products product = new Products();
        product.setTitle(productRequest.title());
        product.setDescription(productRequest.description());
        product.setPrice(productRequest.price());
        product.setImg(productRequest.img());
        Products createdProduct = productsService.create(product);
        return new ProductsResponseDTO(
                createdProduct.getId(),
                createdProduct.getTitle(),
                createdProduct.getImgUrl(),
                createdProduct.getImgName(),
                createdProduct.getDescription(),
                createdProduct.getPrice());
    }

    @GetMapping("/{id}")
    public Optional<ProductsResponseDTO> getById(@PathVariable UUID id) {
        return productsService.getById(id).map(product -> new ProductsResponseDTO(
                product.getId(),
                product.getTitle(),
                product.getImgUrl(),
                product.getImgName(),
                product.getDescription(),
                product.getPrice()));
    }

    @PutMapping("/{id}")
    public ProductsResponseDTO update(@PathVariable UUID id, @ModelAttribute ProductsRequestDTO productRequest) {
        Products product = new Products();
        product.setTitle(productRequest.title());
        product.setDescription(productRequest.description());
        product.setPrice(productRequest.price());
        product.setImg(productRequest.img());
        Products updatedProduct = productsService.Update(id, product);
        return new ProductsResponseDTO(
                updatedProduct.getId(),
                updatedProduct.getTitle(),
                updatedProduct.getImgUrl(),
                updatedProduct.getImgName(),
                updatedProduct.getDescription(),
                updatedProduct.getPrice());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        productsService.delete(id);
        return ResponseEntity.ok("Produto deletado com sucesso");
    }
}
