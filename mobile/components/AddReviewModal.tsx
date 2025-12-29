// React Native AddReviewModal Component
// Modal for submitting reviews

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StarRating } from './StarRating';
import { Button } from './Button';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight } from '../constants/theme';

interface AddReviewModalProps {
  visible: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (review: { userName: string; rating: number; comment: string }) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  visible,
  onClose,
  productName,
  onSubmit,
}) => {
  const colors = Colors.light;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating required', 'Please select a star rating before submitting.');
      return;
    }

    if (comment.trim().length < 10) {
      Alert.alert('Review too short', 'Please write at least 10 characters in your review.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    onSubmit({ userName: userName || 'Anonymous', rating, comment });

    Alert.alert('Success', 'Thank you for sharing your feedback!');

    // Reset form
    setRating(0);
    setComment('');
    setUserName('');
    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    setUserName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.foreground }]}>
                Write a Review
              </Text>
              <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
                {productName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={[styles.closeButton, { backgroundColor: colors.secondary }]}
            >
              <Ionicons name="close" size={20} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Rating */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.foreground }]}>
                Your Rating
              </Text>
              <StarRating
                rating={rating}
                size="lg"
                interactive
                onRatingChange={setRating}
              />
            </View>

            {/* Name */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.foreground }]}>
                Your Name (optional)
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  { backgroundColor: colors.secondary, color: colors.foreground },
                ]}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your name"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            {/* Comment */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.foreground }]}>
                Your Review
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: colors.secondary, color: colors.foreground },
                ]}
                value={comment}
                onChangeText={setComment}
                placeholder="Share your experience with this product..."
                placeholderTextColor={colors.mutedForeground}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <Text style={[styles.charCount, { color: colors.mutedForeground }]}>
                Minimum 10 characters ({comment.length}/10)
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttons}>
              <Button
                onPress={handleClose}
                variant="outline"
                style={styles.button}
              >
                Cancel
              </Button>
              <Button
                onPress={handleSubmit}
                variant="premium"
                loading={isSubmitting}
                style={styles.button}
              >
                Submit Review
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.base,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
  },
  field: {
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  textInput: {
    height: 48,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    fontSize: FontSize.base,
  },
  textArea: {
    height: 120,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    fontSize: FontSize.base,
  },
  charCount: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  button: {
    flex: 1,
  },
});
