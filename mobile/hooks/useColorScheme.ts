// Hook for color scheme - cross-platform
// In Expo, replace with: import { useColorScheme } from 'react-native';

import { useState } from 'react';
import { Colors } from '../constants/theme';

export const useThemeColors = () => {
  // For demo purposes, using light theme
  // In real app: const colorScheme = useColorScheme();
  const [colorScheme] = useState<'light' | 'dark'>('light');
  
  return Colors[colorScheme];
};
