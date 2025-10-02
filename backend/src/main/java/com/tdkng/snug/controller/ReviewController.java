package com.tdkng.snug.controller;

import com.tdkng.snug.payload.ReviewDTO;
import com.tdkng.snug.payload.ReviewResponse;
import com.tdkng.snug.service.ReviewService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviews")
    public ResponseEntity<ReviewResponse> getAllReviews(
        @RequestParam(name = "pageNumber") Integer pageNumber,
        @RequestParam(name = "pageSize") Integer pageSize,
        @RequestParam(name = "sortBy") String sortBy,
        @RequestParam(name = "sortOrder") String sortOrder) {
        return new ResponseEntity<>(reviewService.getAllReviews(pageNumber, pageSize, sortBy, sortOrder), HttpStatus.OK);
    }

    @PostMapping("/reviews")
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody ReviewDTO reviewDTO) {
        return new ResponseEntity<>(reviewService.createReview(reviewDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<ReviewDTO> deleteReview(@PathVariable Long id) {
        ReviewDTO deleted = reviewService.deleteReview(id);
        return new ResponseEntity<>(deleted, HttpStatus.NO_CONTENT);
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@Valid @RequestBody ReviewDTO reviewDTO, @PathVariable Long id) {
        ReviewDTO savedReviewDTO = reviewService.updateReview(reviewDTO, id);
        return new ResponseEntity<>(savedReviewDTO, HttpStatus.OK);
    }
}
