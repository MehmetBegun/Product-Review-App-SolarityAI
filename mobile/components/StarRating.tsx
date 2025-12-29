// React Native StarRating Component
// Compatible with iOS and Android

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize } from '../constants/theme';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
  style?: ViewStyle;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showValue = false,
  style,
}) => {
  const colors = Colors.light;
  const iconSize = sizeMap[size];

  const handlePress = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const renderStar = (index: number) => {
    const filled = index < Math.floor(rating);
    const partial = index === Math.floor(rating) && rating % 1 !== 0;
    
    // For simplicity, we'll use full/empty stars
    // For partial stars, you'd need a more complex implementation
    const isFilled = filled || (partial && rating % 1 >= 0.5);

    const StarComponent = interactive ? TouchableOpacity : View;

    return (
      <StarComponent
        key={index}
        onPress={() => handlePress(index)}
        style={styles.starContainer}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFilled ? 'star' : 'star-outline'}
          size={iconSize}
          color={isFilled ? colors.starFilled : colors.starEmpty}
        />
      </StarComponent>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsRow}>
        {Array.from({ length: maxRating }).map((_, index) => renderStar(index))}
      </View>
      {showValue && (
        <Text style={[styles.valueText, { color: colors.foreground }]}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starContainer: {
    padding: 2,
  },
  valueText: {
    marginLeft: Spacing.sm,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
