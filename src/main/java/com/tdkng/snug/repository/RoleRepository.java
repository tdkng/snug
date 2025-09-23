package com.tdkng.snug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tdkng.snug.model.Role;
import com.tdkng.snug.model.AppRole;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(AppRole roleName);
}
