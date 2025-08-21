package com.tdkng.snug.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tdkng.snug.model.AppUser;
import com.tdkng.snug.service.UserService;

import jakarta.validation.Valid;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("api/public/users")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("api/public/users")
    public ResponseEntity<AppUser> saveUser(@RequestBody AppUser user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @DeleteMapping("api/public/users/{id}")
    public ResponseEntity<AppUser> deleteUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }

    @PutMapping("api/public/users/{id}")
    public ResponseEntity<AppUser> updateUser(@Valid @RequestBody AppUser user, @PathVariable Long id) {
        return new ResponseEntity<>(userService.updateUser(user, id), HttpStatus.OK);
    }
}
