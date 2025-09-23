package com.tdkng.snug.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reviews")
@ToString
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @Min(value = 1, message = "Review rating must be between 1 and 5")
    @Max(value = 5, message = "Review rating must be between 1 and 5")
    private int reviewRating;

    @NotBlank(message = "Review comments are required")
    private String reviewComments;
}
