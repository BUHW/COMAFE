package com.example.comafe_api.service;

import com.example.comafe_api.domain.products.Products;
import com.example.comafe_api.exception.ProductsNotFoundException;
import com.example.comafe_api.interfaces.ProductsInterface;
import com.example.comafe_api.repositories.ProductsRepository;
import com.example.comafe_api.util.UploadUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductsService implements ProductsInterface {

    private final ProductsRepository productsRepository;
    private String baseURL = "/home/sd_victor_antonio/Área de trabalho/RepositoriosGit/COMAFE/comafe-api/src/main/resources/static/img/img-produtos/";

    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public List<Products> getAll() {
        return productsRepository.findAll();
    }

    @Override
    public Optional<Products> getById(UUID id) {
        return productsRepository.findById(id);
    }

    @Override
    public Products create(Products products) {
        if (products.getImg() != null) {
            boolean uploadSuccess = UploadUtil.fazerUploadImagem(products.getImg());
            if (uploadSuccess) {
                products.setImgUrl(baseURL + products.getImg().getOriginalFilename());
                products.setImgName(products.getImg().getOriginalFilename());
            }
        }
        return productsRepository.save(products);
    }

    @Override
    public Products Update(UUID id, Products products) {
        Products productsUpdate = productsRepository.findById(id)
                .orElseThrow(ProductsNotFoundException::new);

        productsUpdate.setTitle(products.getTitle());
        productsUpdate.setDescription(products.getDescription());
        productsUpdate.setPrice(products.getPrice());

        if (products.getImg() != null) {
            boolean uploadSuccess = UploadUtil.fazerUploadImagem(products.getImg());
            if (uploadSuccess) {
                productsUpdate.setImgUrl(baseURL + products.getImg().getOriginalFilename());
                productsUpdate.setImgName(products.getImg().getOriginalFilename());
            }
        }

        return productsRepository.save(productsUpdate);
    }

    @Override
    public void delete(UUID id) {
        Products product = productsRepository.findById(id)
                .orElseThrow(ProductsNotFoundException::new);

        if (product.getImgUrl() != null) {
            UploadUtil.deletarImagem(product.getImgUrl());
        }

        productsRepository.deleteById(id);
    }
}
