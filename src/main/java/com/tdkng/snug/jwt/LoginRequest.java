package com.tdkng.snug.jwt;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}