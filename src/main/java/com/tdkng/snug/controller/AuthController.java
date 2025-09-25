package com.tdkng.snug.controller;

import com.tdkng.snug.model.AppRole;
import com.tdkng.snug.model.Role;
import com.tdkng.snug.model.User;
import com.tdkng.snug.repository.RoleRepository;
import com.tdkng.snug.repository.UserRepository;
import com.tdkng.snug.security.jwt.JwtUtils;
import com.tdkng.snug.security.requests.LoginRequest;
import com.tdkng.snug.security.requests.LoginResponse;
import com.tdkng.snug.security.requests.MessageResponse;
import com.tdkng.snug.security.requests.SignupRequest;
import com.tdkng.snug.security.service.UserDetailsImpl;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("IT WORKS!!!!", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Invalid login");
            map.put("status", false);

            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie cookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        LoginResponse response = new LoginResponse(userDetails.getId(), userDetails.getUsername(), roles);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return new ResponseEntity<>(new MessageResponse("Error: Username is taken.") , HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(request.getUsername())) {
            return new ResponseEntity<>(new MessageResponse("Error: Email is taken.") , HttpStatus.BAD_REQUEST);
        }

        User user = new User(request.getUsername(), request.getEmail(), passwordEncoder.encode(request.getPassword()));

        Set<String> strRoles = request.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role role = roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role not found."));
            roles.add(role);
        } else {
            strRoles.forEach(r -> {
                AppRole appRole = AppRole.ROLE_USER;
                switch(r) {
                    case "admin":
                        appRole = AppRole.ROLE_ADMIN;
                        break;
                    case "owner":
                        appRole = AppRole.ROLE_OWNER;
                        break;
                    default:
                }
                Role role = roleRepository.findByRoleName(appRole)
                        .orElseThrow(() -> new RuntimeException("Error: Role not found."));
                roles.add(role);
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> user(Authentication auth) {
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        LoginResponse response = new LoginResponse(userDetails.getId(), userDetails.getUsername(), roles);

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/username")
    public String username(Authentication auth) {
        return auth != null ? auth.getName() : "No auth. Cannot return username.";
    }
}
