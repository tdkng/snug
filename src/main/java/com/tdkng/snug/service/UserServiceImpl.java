package com.tdkng.snug.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tdkng.snug.exceptions.APIException;
import com.tdkng.snug.exceptions.ResourceNotFoundException;
import com.tdkng.snug.model.AppUser;
import com.tdkng.snug.repository.AppUserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private AppUserRepository appUserRepository;
    
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public AppUser saveUser(AppUser user) {
        AppUser userDb = appUserRepository.findById(user.getId()).orElse(null);
        if (userDb != null) {
            throw new APIException("User with id " + userDb.getId() + " already exists.");
        }
        AppUser savedUser = appUserRepository.save(user);
        return savedUser;
    }

    public AppUser deleteUser(Long id) {
        AppUser user = appUserRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("AppUser", "id", id));
        appUserRepository.delete(user);
        return user;
    }

    public AppUser updateUser(AppUser user, Long id) {
        user.setId(id);
        AppUser savedUser = appUserRepository.save(user);
        return savedUser;
    }
}
