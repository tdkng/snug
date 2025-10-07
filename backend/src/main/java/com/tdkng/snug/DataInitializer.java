package com.tdkng.snug;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tdkng.snug.model.Profile;
import com.tdkng.snug.model.Review;
import com.tdkng.snug.model.User;
import com.tdkng.snug.repository.ReviewRepository;
import com.tdkng.snug.repository.UserRepository;
import com.tdkng.snug.repository.RoleRepository;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class DataInitializer {
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
	public CommandLineRunner initialize() {
		return (args -> {
            User user1 = userRepository.findByUsername("username1")
                    .orElseGet(() -> userRepository.save(new User(
                            "username1",
                            "abc@def.com",
                            "user2sux"
                    )));

            if (user1.getProfile() == null) {
                Profile profile1 = new Profile();
                profile1.setUser(user1);
            }

            if (reviewRepository.findByUser(user1).isEmpty()) {
                Review review1 = new Review();
                review1.setReviewRating(4);
                review1.setReviewComments("place is very pretty!");
                review1.setUser(user1);
                reviewRepository.save(review1);
            }
		});
	}
}
