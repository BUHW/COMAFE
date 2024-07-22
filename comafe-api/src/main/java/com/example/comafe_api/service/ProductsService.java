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
        try {
            if(products.getImg() != null) {
                String imgUrl = UploadUtil.saveBase64Image(products.getImg());
                products.setImg(imgUrl);
            }
            return productsRepository.save(products);
        } catch (Exception e) {
            throw new ProductsNotFoundException();
        }
    }

    @Override
    public Products Update(UUID id, Products products) {
        Products productsUpdate = productsRepository.findById(id)
                .orElseThrow(ProductsNotFoundException::new);

        productsUpdate.setTitle(products.getTitle());
        productsUpdate.setImg(products.getImg());
        productsUpdate.setDescription(products.getDescription());
        productsUpdate.setPrice(products.getPrice());

        return productsRepository.save(productsUpdate);
    }

    @Override
    public void delete(UUID id) {
        productsRepository.deleteById(id);
    }
}
