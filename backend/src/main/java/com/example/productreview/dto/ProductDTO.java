package com.example.productreview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    // ✨ AI-generated review summary
    private String aiSummary;
    
    // Constructor without aiSummary (for backward compatibility)
    public ProductDTO(Long id, String name, String description, String category, 
                     Double price, String imageUrl, Double averageRating, 
                     Integer reviewCount, Map<Integer, Long> ratingBreakdown) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.averageRating = averageRating;
        this.reviewCount = reviewCount;
        this.ratingBreakdown = ratingBreakdown;
        this.aiSummary = null;
    }
}
