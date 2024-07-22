package com.example.comafe_api.exception;

public class UsersNotFoundException extends RuntimeException{

    public UsersNotFoundException() {
        super("User not found");
    }

}
