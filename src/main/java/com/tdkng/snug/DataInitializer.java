package com.tdkng.snug;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.tdkng.snug.model.AppUser;
import com.tdkng.snug.model.Profile;
import com.tdkng.snug.model.Review;
import com.tdkng.snug.repository.AppUserRepository;
import com.tdkng.snug.repository.ProfileRepository;
import com.tdkng.snug.repository.ReviewRepository;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class DataInitializer {
    private final AppUserRepository appUserRepository;
    private final ProfileRepository profileRepository;
    private final ReviewRepository reviewRepository;

    @Bean
	public CommandLineRunner initialize() {
		return (args -> {
			AppUser user1 = new AppUser();
            appUserRepository.save(user1);

            Profile profile1 = new Profile();
            profile1.setAppUser(user1);
            profileRepository.save(profile1);

			Review review1 = new Review();
			review1.setReviewRating(4);
			review1.setReviewComments("place is very pretty!");
			review1.setAppUser(user1);
            reviewRepository.save(review1);
		});
	}
}
