package com.tdkng.snug.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class AppConfig {
    
    static {
        // Load .env file
        Dotenv dotenv = Dotenv.configure()
            .directory("./")
            .ignoreIfMalformed()
            .ignoreIfMissing()
            .load();
        
        // Set system properties for Spring to pick up
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
    }
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
