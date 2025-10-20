package com.tdkng.snug.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class PlacesServiceImpl implements PlacesService {
    private final WebClient client;
    private final String fieldMask = "places.id,places.displayName,places.formattedAddress,places.location,places.rating";
  
    public PlacesServiceImpl(@Qualifier("googlePlacesClient") WebClient client) {
        this.client = client;
      }

    public Mono<Map<String, Object>> getNearbyPlaces(double lat, double lon, int radiusMeters, String type) {
        Map<String, Object> body;
        
        if (type != null && (type.equals("cafe") || type.equals("study_spot") || type.equals("cafe_study"))) {
            String textQuery;
            if (type.equals("cafe")) {
                textQuery = "cafe coffee";
            } else if (type.equals("study_spot")) {
                textQuery = "study space library";
            } else { // cafe_study
                textQuery = "cafe study space coffee shop";
            }
            
            body = Map.of(
                "textQuery", textQuery,
                "maxResultCount", 20,
                "locationBias", Map.of(
                  "circle", Map.of(
                    "center", Map.of("latitude", lat, "longitude", lon),
                    "radius", radiusMeters
                  )
                )
            );
        } else {
            // Use type filtering for valid Google Places types
            body = Map.of(
                "includedTypes", type != null ? List.of(type) : List.of(),
                "maxResultCount", 20,
                "locationRestriction", Map.of(
                  "circle", Map.of(
                    "center", Map.of("latitude", lat, "longitude", lon),
                    "radius", radiusMeters
                  )
                )
            );
        }
      
        String endpoint = (type != null && (type.equals("cafe") || type.equals("study_spot") || type.equals("cafe_study"))) 
            ? "/places:searchText" 
            : "/places:searchNearby";
            
        return client.post()
        .uri(endpoint)
        .header("X-Goog-FieldMask", fieldMask)
        .bodyValue(body)
        .retrieve()
        .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
            response -> response.bodyToMono(String.class)
                .flatMap(errorBody -> Mono.error(new RuntimeException("Google Places API error: " + errorBody))))
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    public Mono<Map<String, Object>> getPlaceDetails(String placeId) {
        return client.get()
            .uri("/places/{placeId}", placeId)
            .header("X-Goog-FieldMask", "id,displayName,formattedAddress,location,rating,internationalPhoneNumber,websiteUri")
            .retrieve()
            .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                response -> response.bodyToMono(String.class)
                    .flatMap(errorBody -> Mono.error(new RuntimeException("Google Places API error: " + errorBody))))
            .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});
    }
}
