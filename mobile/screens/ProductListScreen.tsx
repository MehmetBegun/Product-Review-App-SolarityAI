// React Native ProductListScreen
// Main screen showing all products

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { products, getProductsByCategory } from '../constants/data';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants/theme';

export const ProductListScreen: React.FC = () => {
  const colors = Colors.light;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = getProductsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const stats = useMemo(() => {
    const totalReviews = products.reduce((acc, p) => acc + p.reviewCount, 0);
    const avgRating = products.reduce((acc, p) => acc + p.averageRating, 0) / products.length;
    return { totalReviews, avgRating, productCount: products.length };
  }, []);

  const renderHeader = () => (
    <View>
      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: colors.accent }]}>
        {/* Tagline */}
        <View style={[styles.tagline, { backgroundColor: colors.background }]}>
          <Ionicons name="sparkles" size={14} color={colors.primary} />
          <Text style={[styles.taglineText, { color: colors.accentForeground }]}>
            Discover honest reviews from real users
          </Text>
        </View>

        {/* Title */}
        <Text style={[styles.heroTitle, { color: colors.foreground }]}>
          Find Products You'll{' '}
          <Text style={{ color: colors.primary }}>Love</Text>
        </Text>

        {/* Subtitle */}
        <Text style={[styles.heroSubtitle, { color: colors.mutedForeground }]}>
          Read authentic reviews, compare ratings, and make informed decisions.
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <LinearGradient
              colors={['#F59E0B', '#FBBF24']}
              style={styles.statIcon}
            >
              <Ionicons name="star" size={18} color={colors.primaryForeground} />
            </LinearGradient>
            <View>
              <Text style={[styles.statValue, { color: colors.foreground }]}>
                {stats.avgRating.toFixed(1)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                Avg Rating
              </Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <LinearGradient
              colors={['#F59E0B', '#FBBF24']}
              style={styles.statIcon}
            >
              <Ionicons name="trending-up" size={18} color={colors.primaryForeground} />
            </LinearGradient>
            <View>
              <Text style={[styles.statValue, { color: colors.foreground }]}>
                {stats.totalReviews.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                Reviews
              </Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <LinearGradient
              colors={['#F59E0B', '#FBBF24']}
              style={styles.statIcon}
            >
              <Ionicons name="cube" size={18} color={colors.primaryForeground} />
            </LinearGradient>
            <View>
              <Text style={[styles.statValue, { color: colors.foreground }]}>
                {stats.productCount}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                Products
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Explore Products
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.mutedForeground }]}>
            {filteredProducts.length} products found
          </Text>
        </View>
      </View>

      {/* Categories */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={48} color={colors.mutedForeground} />
      <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
        No products found
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
        Try adjusting your search or filters
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    alignItems: 'center',
  },
  tagline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
  },
  taglineText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  heroTitle: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  heroSubtitle: {
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.5,
    marginBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing['2xl'],
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },
  statValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  statLabel: {
    fontSize: FontSize.xs,
  },
  searchSection: {
    paddingVertical: Spacing.lg,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSize.sm,
  },
  listContent: {
    paddingBottom: Spacing['3xl'],
  },
  columnWrapper: {
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
  emptySubtitle: {
    fontSize: FontSize.base,
  },
});
