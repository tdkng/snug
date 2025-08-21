package com.tdkng.snug.service;

import java.util.List;

import com.tdkng.snug.model.AppUser;

public interface UserService {
    List<AppUser> getAllUsers();
    AppUser saveUser(AppUser user);
    AppUser deleteUser(Long id);
    AppUser updateUser(AppUser user, Long id);
}
