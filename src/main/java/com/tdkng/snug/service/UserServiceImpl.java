package com.tdkng.snug.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tdkng.snug.model.AppUser;
import com.tdkng.snug.repository.AppUserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private AppUserRepository appUserRepository;
    
    public List<AppUser> getAllUsers() {
        return null;
    }

    public AppUser saveUser(AppUser user) {
        return null;
    }

    public AppUser deleteUser(Long id) {
        return null;
    }

    public AppUser updateUser(AppUser user, Long id) {
        return null;
    }
}
