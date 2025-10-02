package com.tdkng.snug.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;

    private String name;
    private String address;
    private int rating;
    private String openHours;
    private String priceRange;

    private boolean takeout;
    private boolean delivery;
    private boolean liveMusic;
    private boolean restroom;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User user;

    @OneToMany(mappedBy = "place")
    private List<Review> reviews = new ArrayList<>();
}
