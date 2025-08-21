package com.tdkng.snug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.validation.constraints.NotNull;

import com.tdkng.snug.model.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

}
