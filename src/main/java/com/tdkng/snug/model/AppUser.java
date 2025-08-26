package com.tdkng.snug.model;

import java.util.List;
import java.util.Objects;
import java.util.ArrayList;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "app_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.ALL)
    private Profile profile;

    @OneToMany(mappedBy = "appUser")
    private List<Review> reviews = new ArrayList<>();

    public void setProfile(Profile profile) {
        profile.setAppUser(this);
        this.profile = profile;
    }

    public int hashCode() {
        return Objects.hash(new Object[]{this.id});
    }
}
