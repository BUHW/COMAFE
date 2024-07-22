package com.example.comafe_api.exception;

public class ProductsNotFoundException extends RuntimeException{

    public ProductsNotFoundException() {
        super("Products not found");
    }

}
