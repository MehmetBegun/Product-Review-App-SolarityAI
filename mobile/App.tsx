// React Native App Entry Point
// Main navigation setup for Expo

/**
 * EXPO SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Expo project:
 *    npx create-expo-app ProductReviewApp
 * 
 * 2. Install required dependencies:
 *    npx expo install @react-navigation/native @react-navigation/native-stack
 *    npx expo install react-native-screens react-native-safe-area-context
 *    npx expo install expo-linear-gradient
 *    npx expo install @expo/vector-icons
 * 
 * 3. Copy all files from src/native to your Expo project
 * 
 * 4. Update App.tsx with the code below
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ProductListScreen } from './screens/ProductListScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { RootStackParamList } from './types';
import { Colors } from './constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colors = Colors.light;

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="ProductList" 
          component={ProductListScreen}
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
