package com.tdkng.snug.repository;

import com.tdkng.snug.model.Role;
import com.tdkng.snug.model.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole roleName);
}
