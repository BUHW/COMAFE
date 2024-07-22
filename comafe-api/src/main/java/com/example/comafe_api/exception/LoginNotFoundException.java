package com.example.comafe_api.exception;

public class LoginNotFoundException extends RuntimeException{

    public LoginNotFoundException() {
        super("Login not found");
    }

}
