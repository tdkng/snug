package com.tdkng.snug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tdkng.snug.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}