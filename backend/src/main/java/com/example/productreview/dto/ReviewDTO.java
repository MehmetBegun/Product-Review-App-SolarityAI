package com.example.productreview.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class ReviewDTO {
    private Long id;

    @NotBlank(message = "Reviewer name is required")
    @Size(min = 2, max = 50, message = "Reviewer name must be between 2 and 50 characters")
    private String reviewerName;

    @NotBlank(message = "Comment is required")
    @Size(min = 10, max = 500, message = "Comment must be between 10 and 500 characters")
    private String comment;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    private Integer helpfulCount;
    private LocalDateTime createdAt;
    private Long productId;

    public ReviewDTO() {
    }

    public ReviewDTO(Long id, String reviewerName, String comment, Integer rating, Integer helpfulCount, LocalDateTime createdAt, Long productId) {
        this.id = id;
        this.reviewerName = reviewerName;
        this.comment = comment;
        this.rating = rating;
        this.helpfulCount = helpfulCount;
        this.createdAt = createdAt;
        this.productId = productId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewerName() {
        return reviewerName;
    }

    public void setReviewerName(String reviewerName) {
        this.reviewerName = reviewerName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getHelpfulCount() {
        return helpfulCount;
    }

    public void setHelpfulCount(Integer helpfulCount) {
        this.helpfulCount = helpfulCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
