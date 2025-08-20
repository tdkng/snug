package com.tdkng.snug.model;

import org.springframework.boot.autoconfigure.condition.AllNestedConditions;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @Min(value = 1, message = "Review rating must be between 1 and 5")
    @Max(value = 5, message = "Review rating must be between 1 and 5")
    private int reviewRating;

    @NotBlank(message = "Review comments are required")
    private String reviewComments;
}
