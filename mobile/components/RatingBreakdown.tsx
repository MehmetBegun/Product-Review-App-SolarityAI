// React Native RatingBreakdown Component
// Visual breakdown of rating distribution

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface RatingBreakdownProps {
  reviews: { rating: number }[];
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ reviews }) => {
  const colors = Colors.light;
  const totalReviews = reviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => Math.floor(r.rating) === rating).length,
  }));

  return (
    <View style={styles.container}>
      {ratingCounts.map(({ rating, count }) => {
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <View key={rating} style={styles.row}>
            <Text style={[styles.ratingNumber, { color: colors.foreground }]}>
              {rating}
            </Text>
            <View style={[styles.barBackground, { backgroundColor: colors.secondary }]}>
              <LinearGradient
                colors={['#F59E0B', '#FBBF24']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.barFill, { width: `${percentage}%` }]}
              />
            </View>
            <Text style={[styles.count, { color: colors.mutedForeground }]}>
              {count}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  ratingNumber: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    width: 12,
    textAlign: 'center',
  },
  barBackground: {
    flex: 1,
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  count: {
    fontSize: FontSize.sm,
    width: 32,
    textAlign: 'right',
  },
});
