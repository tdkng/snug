package com.tdkng.snug.service;

import com.tdkng.snug.model.Review;
import com.tdkng.snug.payload.ReviewDTO;
import com.tdkng.snug.payload.ReviewResponse;

public interface ReviewService {
    ReviewResponse getAllReviews(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    ReviewDTO createReview(ReviewDTO reviewDTO);
    ReviewDTO deleteReview(Long id);
    ReviewDTO updateReview(ReviewDTO reviewDTO, Long id);
}
