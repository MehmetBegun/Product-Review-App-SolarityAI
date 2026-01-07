// AIAssistantScreen.tsx
// Full-screen AI Assistant for product review analysis

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ScreenWrapper } from '../components/ScreenWrapper';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import { Spacing, FontSize, BorderRadius, FontWeight, Shadow } from '../constants/theme';

type RouteType = RouteProp<RootStackParamList, 'AIAssistant'>;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIAssistantScreen: React.FC = () => {
  const route = useRoute<RouteType>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const productName = route.params?.productName || 'this product';
  const reviews = route.params?.reviews || [];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your AI assistant for ${productName}. I can help you understand customer reviews better. Try asking:\n\n• How many reviews are there?\n• What do customers say about quality?\n• When were most reviews posted?\n• What are the main complaints?\n• Any common praise patterns?`,
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    '📊 How many reviews?',
    '⭐ Overall sentiment?',
    '📅 Recent feedback?',
    '❤️ What do people love?',
    '⚠️ Common complaints?',
  ];

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const analyzeReviews = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('how many') || lowerQuestion.includes('count')) {
      return `There are **${reviews.length} customer reviews** for this product.\n\nRating breakdown:\n${generateRatingBreakdown()}`;
    }

    if (lowerQuestion.includes('sentiment') || lowerQuestion.includes('overall')) {
      const avgRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length;
      const positiveCount = reviews.filter((r: any) => r.rating >= 4).length;
      const negativeCount = reviews.filter((r: any) => r.rating <= 2).length;

      let sentiment = '';
      if (avgRating >= 4.0) sentiment = '😊 Very Positive';
      else if (avgRating >= 3.5) sentiment = '🙂 Generally Positive';
      else if (avgRating >= 2.5) sentiment = '😐 Mixed';
      else sentiment = '😞 Negative';

      return `${sentiment} (${avgRating.toFixed(1)}/5.0)\n\n✅ Positive reviews: ${positiveCount}\n❌ Negative reviews: ${negativeCount}`;
    }

    if (lowerQuestion.includes('when') || lowerQuestion.includes('date') || lowerQuestion.includes('recent')) {
      const sorted = [...reviews].sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const recent = sorted.slice(0, 3);

      return `📅 Most recent reviews:\n\n${recent.map((r: any, i: number) =>
        `${i + 1}. ${r.reviewerName || r.userName} - ${r.rating}⭐ (${new Date(r.createdAt).toLocaleDateString()})\n"${r.comment.substring(0, 80)}..."`
      ).join('\n\n')}`;
    }

    if (lowerQuestion.includes('love') || lowerQuestion.includes('praise') || lowerQuestion.includes('positive')) {
      const positive = reviews.filter((r: any) => r.rating >= 4);
      const themes = extractThemes(positive);

      return `❤️ What customers love:\n\n${themes}\n\n📝 Sample positive review:\n"${positive[0]?.comment || 'No positive reviews yet.'}"`;
    }

    if (lowerQuestion.includes('complaint') || lowerQuestion.includes('problem') || lowerQuestion.includes('negative')) {
      const negative = reviews.filter((r: any) => r.rating <= 2);
      const themes = extractThemes(negative);

      return `⚠️ Common complaints:\n\n${themes}\n\n📝 Sample negative review:\n"${negative[0]?.comment || 'No negative reviews yet.'}"`;
    }

    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost')) {
      const priceMentions = reviews.filter((r: any) =>
        r.comment.toLowerCase().includes('price') ||
        r.comment.toLowerCase().includes('expensive') ||
        r.comment.toLowerCase().includes('cheap')
      );

      if (priceMentions.length === 0) {
        return "💰 No customers specifically mentioned pricing in their reviews.";
      }

      return `💰 ${priceMentions.length} reviews mention pricing:\n\n${priceMentions.slice(0, 2).map((r: any) =>
        `"${r.comment.substring(0, 100)}..." - ${r.reviewerName || r.userName}`
      ).join('\n\n')}`;
    }

    return generateGeneralSummary();
  };

  const generateRatingBreakdown = (): string => {
    const breakdown = [5, 4, 3, 2, 1].map(rating => {
      const count = reviews.filter((r: any) => Math.floor(r.rating) === rating).length;
      const percentage = reviews.length > 0 ? (count / reviews.length * 100).toFixed(0) : 0;
      const bar = '█'.repeat(Math.floor(Number(percentage) / 10));
      return `${rating}⭐ ${bar} ${count} (${percentage}%)`;
    });

    return breakdown.join('\n');
  };

  const extractThemes = (reviewList: any[]): string => {
    if (reviewList.length === 0) return '• No reviews in this category';

    const allComments = reviewList.map(r => r.comment.toLowerCase()).join(' ');

    const themes = [];
    if (allComments.includes('quality')) themes.push('• Quality');
    if (allComments.includes('design') || allComments.includes('look')) themes.push('• Design');
    if (allComments.includes('performance') || allComments.includes('fast')) themes.push('• Performance');
    if (allComments.includes('battery')) themes.push('• Battery life');
    if (allComments.includes('price') || allComments.includes('expensive')) themes.push('• Price');
    if (allComments.includes('delivery') || allComments.includes('shipping')) themes.push('• Delivery');

    return themes.length > 0 ? themes.join('\n') : '• General satisfaction';
  };

  const generateGeneralSummary = (): string => {
    const avgRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length;
    const positiveCount = reviews.filter((r: any) => r.rating >= 4).length;

    return `📊 Summary for ${productName}:\n\n` +
      `Total Reviews: ${reviews.length}\n` +
      `Average Rating: ${avgRating.toFixed(1)}⭐\n` +
      `Positive Reviews: ${positiveCount} (${(positiveCount / reviews.length * 100).toFixed(0)}%)\n\n` +
      `Try asking me specific questions about pricing, quality, or recent feedback!`;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: analyzeReviews(inputText),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleSuggestionPress = (suggestion: string) => {
    const cleanQuestion = suggestion.replace(/[📊⭐📅❤️⚠️]/g, '').trim();
    setInputText(cleanQuestion);
  };

  return (
    <ScreenWrapper backgroundColor={colors.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={colors.foreground} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <LinearGradient colors={['#8B5CF6', '#6366F1']} style={styles.aiAvatar}>
              <Ionicons name="chatbubbles" size={20} color="#fff" />
            </LinearGradient>
            <View>
              <Text style={[styles.headerTitle, { color: colors.foreground }]}>AI Assistant</Text>
              <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>
                Analyzing {reviews.length} reviews
              </Text>
            </View>
          </View>

          <View style={{ width: 40 }} />
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.role === 'user'
                  ? [styles.userBubble, { backgroundColor: colors.primary }]
                  : [styles.assistantBubble, { backgroundColor: colors.secondary }],
              ]}
            >
              {message.role === 'assistant' && (
                <View style={styles.messageHeader}>
                  <LinearGradient colors={['#8B5CF6', '#6366F1']} style={styles.miniAvatar}>
                    <Ionicons name="sparkles" size={12} color="#fff" />
                  </LinearGradient>
                  <Text style={[styles.assistantLabel, { color: colors.mutedForeground }]}>
                    AI Assistant
                  </Text>
                </View>
              )}

              <Text
                style={[
                  styles.messageText,
                  {
                    color: message.role === 'user'
                      ? colors.primaryForeground
                      : colors.foreground,
                  },
                ]}
              >
                {message.content}
              </Text>

              <Text
                style={[
                  styles.messageTime,
                  {
                    color: message.role === 'user'
                      ? colors.primaryForeground + '90'
                      : colors.mutedForeground,
                  },
                ]}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          ))}

          {isLoading && (
            <View style={[styles.loadingBubble, { backgroundColor: colors.secondary }]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>
                Analyzing reviews...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsContainer}
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSuggestionPress(suggestion)}
                style={[styles.suggestionChip, {
                  backgroundColor: colors.secondary,
                  borderColor: colors.border,
                }]}
              >
                <Text style={[styles.suggestionText, { color: colors.foreground }]}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Input */}
        <View style={[styles.inputContainer, {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        }]}>
          <TextInput
            style={[styles.input, {
              backgroundColor: colors.secondary,
              color: colors.foreground,
            }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything about reviews..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
          >
            <LinearGradient
              colors={inputText.trim() && !isLoading
                ? ['#8B5CF6', '#6366F1']
                : ['#ccc', '#999']
              }
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },

  backButton: {
    padding: Spacing.xs,
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },

  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },

  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },

  headerSubtitle: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  messageBubble: {
    maxWidth: '80%',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },

  userBubble: {
    alignSelf: 'flex-end',
    ...Shadow.soft,
  },

  assistantBubble: {
    alignSelf: 'flex-start',
  },

  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },

  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  assistantLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },

  messageText: {
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * 1.5,
    marginBottom: Spacing.xs,
  },

  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },

  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
  },

  loadingText: {
    fontSize: FontSize.sm,
  },

  suggestionsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },

  suggestionChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },

  suggestionText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.base,
  },

  sendButton: {
    marginBottom: 2,
  },

  sendButtonDisabled: {
    opacity: 0.5,
  },

  sendButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },
});
