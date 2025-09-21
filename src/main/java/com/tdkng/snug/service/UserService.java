package com.tdkng.snug.service;

import java.util.List;

import com.tdkng.snug.model.User;

public interface UserService {
    List<User> getAllUsers();
    User saveUser(User user);
    User deleteUser(Long id);
    User updateUser(User user, Long id);
}
