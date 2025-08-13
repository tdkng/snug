package com.tdkng.snug.service;

import java.util.List;

import com.tdkng.snug.exceptions.APIException;
import com.tdkng.snug.exceptions.ResourceNotFoundException;
import com.tdkng.snug.model.Review;
import com.tdkng.snug.payload.ReviewDTO;
import com.tdkng.snug.payload.ReviewResponse;
import com.tdkng.snug.repository.ReviewRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReviewResponse getAllReviews(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Review> reviewPage = reviewRepository.findAll(pageDetails);

        List<Review> reviews = reviewPage.getContent();
        if (reviews.isEmpty())
            throw new APIException("No reviews created.");

        List<ReviewDTO> reviewDTOS = reviews.stream()
                .map(category -> modelMapper.map(category, ReviewDTO.class))
                .toList();

        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setContent(reviewDTOS);
        reviewResponse.setPageNo(reviewPage.getNumber());
        reviewResponse.setPageSize(reviewPage.getSize());
        reviewResponse.setTotalElements(reviewPage.getTotalElements());
        reviewResponse.setTotalPages(reviewPage.getTotalPages());
        reviewResponse.setLast(reviewPage.isLast());
        return reviewResponse;
    }

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        Review review = modelMapper.map(reviewDTO, Review.class);
        Review reviewDb = reviewRepository.findByReviewerId(review.getReviewerId());
        if (reviewDb != null)
            throw new APIException("Review by reviewer " + review.getReviewerId() + " already exists.");
        Review savedReview = reviewRepository.save(review);
        return modelMapper.map(savedReview, ReviewDTO.class);
    }

    @Override
    public ReviewDTO deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Review", "reviewId", id));
        reviewRepository.delete(review);
        return modelMapper.map(review, ReviewDTO.class);
    }

    @Override
    public ReviewDTO updateReview(ReviewDTO reviewDTO, Long id) {
        Review review = modelMapper.map(reviewDTO, Review.class);
        review.setReviewId(id);
        Review savedReview = reviewRepository.save(review);
        return modelMapper.map(savedReview, ReviewDTO.class);
    }
}
