package com.example.productreview.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

/**
 * Cache Configuration for AI-generated summaries
 * Uses Caffeine cache with 1-hour expiration
 */
@Configuration
@EnableCaching
public class CacheConfig {
    // Caffeine cache is configured via application.properties
    // Cache names are defined in service methods using @Cacheable
}
