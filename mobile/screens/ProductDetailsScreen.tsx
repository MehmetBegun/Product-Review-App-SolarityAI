// React Native ProductDetailsScreen
// Detailed product view with reviews

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';
import { RatingBreakdown } from '../components/RatingBreakdown';
import { Button } from '../components/Button';
import { AddReviewModal } from '../components/AddReviewModal';
import { getProductById } from '../constants/data';
import { Review, RootStackParamList } from '../types';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants/theme';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const colors = Colors.light;
  
  const { productId } = route.params;
  const product = getProductById(productId);
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(product?.reviews || []);

  const stats = useMemo(() => {
    if (!reviews.length) return { avgRating: 0, totalReviews: 0 };
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    return { avgRating, totalReviews: reviews.length };
  }, [reviews]);

  const handleAddReview = (newReview: { userName: string; rating: number; comment: string }) => {
    const review: Review = {
      id: `r${Date.now()}`,
      productId: productId,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    setReviews([review, ...reviews]);
  };

  if (!product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: colors.foreground }]}>
            Product Not Found
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backLink, { color: colors.primary }]}>
              ← Back to Products
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color={colors.mutedForeground} />
          <Text style={[styles.backButtonText, { color: colors.mutedForeground }]}>
            Back to Products
          </Text>
        </TouchableOpacity>

        {/* Product Image */}
        <View style={[styles.imageContainer, { backgroundColor: colors.secondary }]}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          {/* Category Badge */}
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={[styles.badgeText, { color: colors.accentForeground }]}>
              {product.category}
            </Text>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: colors.foreground }]}>
            {product.name}
          </Text>

          {/* Rating Summary */}
          <View style={styles.ratingRow}>
            <StarRating rating={stats.avgRating} size="lg" showValue />
            <Text style={[styles.reviewCount, { color: colors.mutedForeground }]}>
              ({stats.totalReviews.toLocaleString()} reviews)
            </Text>
          </View>

          {/* Price */}
          <Text style={[styles.price, { color: colors.foreground }]}>
            ${product.price.toFixed(2)}
          </Text>

          {/* Description */}
          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            {product.description}
          </Text>

          {/* Add Review Button */}
          <Button
            onPress={() => setIsReviewModalOpen(true)}
            variant="premium"
            size="lg"
            fullWidth
            icon={<Ionicons name="add" size={20} color={colors.primaryForeground} />}
          >
            Write a Review
          </Button>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Customer Reviews
          </Text>

          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.secondary }]}>
              <LinearGradient
                colors={['#F59E0B', '#FBBF24']}
                style={styles.statCardIcon}
              >
                <Ionicons name="star" size={20} color={colors.primaryForeground} />
              </LinearGradient>
              <View>
                <Text style={[styles.statCardValue, { color: colors.foreground }]}>
                  {stats.avgRating.toFixed(1)}
                </Text>
                <Text style={[styles.statCardLabel, { color: colors.mutedForeground }]}>
                  Average Rating
                </Text>
              </View>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.secondary }]}>
              <LinearGradient
                colors={['#F59E0B', '#FBBF24']}
                style={styles.statCardIcon}
              >
                <Ionicons name="chatbubble" size={20} color={colors.primaryForeground} />
              </LinearGradient>
              <View>
                <Text style={[styles.statCardValue, { color: colors.foreground }]}>
                  {stats.totalReviews}
                </Text>
                <Text style={[styles.statCardLabel, { color: colors.mutedForeground }]}>
                  Total Reviews
                </Text>
              </View>
            </View>
          </View>

          {/* Rating Breakdown */}
          <View style={[styles.breakdownCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.breakdownTitle, { color: colors.foreground }]}>
              Rating Breakdown
            </Text>
            <RatingBreakdown reviews={reviews} />
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            <Text style={[styles.reviewsListTitle, { color: colors.foreground }]}>
              All Reviews ({reviews.length})
            </Text>

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <View style={[styles.emptyReviews, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Ionicons name="chatbubble-outline" size={40} color={colors.mutedForeground} />
                <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
                  No reviews yet
                </Text>
                <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
                  Be the first to share your experience!
                </Text>
                <Button
                  onPress={() => setIsReviewModalOpen(true)}
                  variant="premium"
                >
                  Write the First Review
                </Button>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Review Modal */}
      <AddReviewModal
        visible={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productName={product.name}
        onSubmit={handleAddReview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  backButtonText: {
    fontSize: FontSize.sm,
  },
  imageContainer: {
    aspectRatio: 1,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadow.soft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reviewCount: {
    fontSize: FontSize.sm,
  },
  price: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
  },
  description: {
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.6,
    marginBottom: Spacing.md,
  },
  reviewsSection: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  statCardIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },
  statCardValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  statCardLabel: {
    fontSize: FontSize.xs,
  },
  breakdownCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 0.5,
  },
  breakdownTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.lg,
  },
  reviewsList: {
    gap: Spacing.md,
  },
  reviewsListTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
  },
  emptyReviews: {
    alignItems: 'center',
    padding: Spacing['3xl'],
    borderRadius: BorderRadius.xl,
    borderWidth: 0.5,
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
  },
  emptySubtitle: {
    fontSize: FontSize.base,
    marginBottom: Spacing.md,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  notFoundText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  backLink: {
    fontSize: FontSize.base,
  },
});
