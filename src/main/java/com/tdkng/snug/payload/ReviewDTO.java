package com.tdkng.snug.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long reviewId;
    private String reviewerId;
    private int reviewRating;
    private String reviewComments;
}
