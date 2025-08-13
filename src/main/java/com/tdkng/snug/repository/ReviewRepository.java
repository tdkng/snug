package com.tdkng.snug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.validation.constraints.NotNull;
import com.tdkng.snug.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByReviewerId(@NotNull Long reviewerId);
}
