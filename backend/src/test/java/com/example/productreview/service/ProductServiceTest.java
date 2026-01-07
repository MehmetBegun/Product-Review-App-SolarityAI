package com.example.productreview.service;

import com.example.productreview.dto.ProductDTO;
import com.example.productreview.model.Product;
import com.example.productreview.model.Review;
import com.example.productreview.repository.ProductRepository;
import com.example.productreview.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ReviewRepository reviewRepository;
    
    @Mock
    private AISummaryService aiSummaryService;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        product = new Product();
        product.setId(1L);
        product.setName("Test Product");
        product.setDescription("Description");
        product.setCategory("Category");
        product.setPrice(100.0);
        product.setImageUrl("http://example.com/image.jpg");
        product.setAverageRating(4.5);
        product.setReviewCount(10);

        // Create ProductDTO without aiSummary (using backward compatible constructor)
        productDTO = new ProductDTO(
            1L, 
            "Test Product", 
            "Description", 
            "Category", 
            100.0, 
            "http://example.com/image.jpg", 
            4.5, 
            10, 
            null
        );
    }

    @Test
    void getAllProducts_ShouldReturnPageOfDTOs() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Product> productPage = new PageImpl<>(Arrays.asList(product));
        when(productRepository.findAll(pageable)).thenReturn(productPage);

        // Updated to pass null as category
        Page<ProductDTO> result = productService.getAllProducts(null, pageable);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
    }

    @Test
    void getProductById_ShouldReturnProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(reviewRepository.findRatingCountsByProductId(1L)).thenReturn(Arrays.asList());
        when(reviewRepository.findByProductId(1L)).thenReturn(Arrays.asList());

        Product result = productService.getProductById(1L);

        assertNotNull(result);
        assertEquals("Test Product", result.getName());
    }

    @Test
    void getProductById_ShouldThrowExceptionWhenNotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> productService.getProductById(1L));
    }
}
