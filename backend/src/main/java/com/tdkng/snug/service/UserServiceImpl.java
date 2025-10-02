package com.tdkng.snug.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tdkng.snug.exceptions.ResourceNotFoundException;
import com.tdkng.snug.model.User;
import com.tdkng.snug.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
        return user;
    }

    public User updateUser(User user, Long id) {
        user.setId(id);
        User savedUser = userRepository.save(user);
        return savedUser;
    }
}
