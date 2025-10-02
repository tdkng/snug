package com.tdkng.snug.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class AppConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    @Qualifier("googlePlacesClient")
    public WebClient googlePlacesClient(@Value("${google.places.apiKey}") String apiKey) {
        return WebClient.builder()
            .baseUrl("https://places.googleapis.com/v1")
            .defaultHeader("X-Goog-Api-Key", apiKey)
            .build();
    }
}
