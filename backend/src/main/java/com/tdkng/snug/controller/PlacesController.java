package com.tdkng.snug.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tdkng.snug.service.PlacesService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/public")
public class PlacesController {
    @Autowired
    private final PlacesService placesService;

    public PlacesController(PlacesService placesService) {
      this.placesService = placesService;
    }
  
    @GetMapping("/places/nearby")
    public Mono<Map<String, Object>> nearby(
        @RequestParam double lat,
        @RequestParam double lon,
        @RequestParam int radiusMeters,
        @RequestParam(required = false) String type) {
      return placesService.getNearbyPlaces(lat, lon, radiusMeters, type);
    }
  
    @GetMapping("/places/{placeId}")
    public Mono<Map<String, Object>> details(@PathVariable String placeId) {
      return placesService.getPlaceDetails(placeId);
    }
}
