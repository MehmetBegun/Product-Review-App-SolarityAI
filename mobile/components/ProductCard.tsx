// React Native ProductCard Component
// Cross-platform card for product display

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StarRating } from './StarRating';
import { Product, RootStackParamList } from '../types';
import { Colors, Spacing, FontSize, BorderRadius, Shadow, FontWeight } from '../constants/theme';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.lg * 3) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colors = Colors.light;

  const handlePress = () => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={[styles.container, { backgroundColor: colors.card }]}
    >
      {/* Image */}
      <View style={[styles.imageContainer, { backgroundColor: colors.secondary }]}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Category Badge */}
        <View style={[styles.badge, { backgroundColor: colors.background }]}>
          <Text style={[styles.badgeText, { color: colors.foreground }]}>
            {product.category}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Rating */}
        <View style={styles.ratingRow}>
          <StarRating rating={product.averageRating} size="sm" />
          <Text style={[styles.reviewCount, { color: colors.mutedForeground }]}>
            ({product.reviewCount.toLocaleString()})
          </Text>
        </View>

        {/* Title */}
        <Text 
          style={[styles.title, { color: colors.foreground }]} 
          numberOfLines={1}
        >
          {product.name}
        </Text>

        {/* Description */}
        <Text 
          style={[styles.description, { color: colors.mutedForeground }]} 
          numberOfLines={2}
        >
          {product.description}
        </Text>

        {/* Price */}
        <Text style={[styles.price, { color: colors.foreground }]}>
          ${product.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.soft,
    marginBottom: Spacing.lg,
  },
  imageContainer: {
    aspectRatio: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  content: {
    padding: Spacing.lg,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  reviewCount: {
    fontSize: FontSize.xs,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * 1.4,
    marginBottom: Spacing.md,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
});
