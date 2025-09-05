package com.tdkng.snug.service;

import java.util.Map;

import reactor.core.publisher.Mono;

public interface PlacesService {
    public Mono<Map<String, Object>> getNearbyPlaces(double lat, double lon, int radiusMeters, String type);
    public Mono<Map<String, Object>> getPlaceDetails(String placeId);
}
