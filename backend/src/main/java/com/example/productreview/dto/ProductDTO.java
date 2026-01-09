package com.example.productreview.dto;

import java.util.Map;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Double price;
    private String imageUrl;
    private Double averageRating;
    private Integer reviewCount;
    private Map<Integer, Long> ratingBreakdown;
    private String aiSummary;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String name, String description, String category, Double price, String imageUrl, Double averageRating, Integer reviewCount, Map<Integer, Long> ratingBreakdown, String aiSummary) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.ratingBreakdown = ratingBreakdown;
        this.aiSummary = aiSummary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Map<Integer, Long> getRatingBreakdown() {
        return ratingBreakdown;
    }

    public void setRatingBreakdown(Map<Integer, Long> ratingBreakdown) {
        this.ratingBreakdown = ratingBreakdown;
    }

    public String getAiSummary() {
        return aiSummary;
    }

    public void setAiSummary(String aiSummary) {
        this.aiSummary = aiSummary;
    }
}
