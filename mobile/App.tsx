// React Native App Entry Point with SafeAreaProvider, Notifications, Toast, Wishlist, Theme
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProductListScreen } from './screens/ProductListScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { NotificationDetailScreen } from './screens/NotificationDetailScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { AIAssistantScreen } from './screens/AIAssistantScreen';  // ← YENİ SATIR
import { NotificationProvider } from './context/NotificationContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NotificationProvider>
          <WishlistProvider>
            <ToastProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="ProductList"
                  screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                  }}
                >
                  <Stack.Screen name="ProductList" component={ProductListScreen} />
                  <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                  <Stack.Screen 
                    name="Notifications" 
                    component={NotificationsScreen}
                    options={{ animation: 'slide_from_bottom' }}
                  />
                  <Stack.Screen 
                    name="NotificationDetail" 
                    component={NotificationDetailScreen}
                    options={{ animation: 'slide_from_right' }}
                  />
                  <Stack.Screen 
                    name="Wishlist" 
                    component={WishlistScreen}
                    options={{ animation: 'slide_from_right' }}
                  />
                  {/* AI Assistant Screen - YENİ! */}
                  <Stack.Screen 
                    name="AIAssistant" 
                    component={AIAssistantScreen}
                    options={{ animation: 'slide_from_right' }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ToastProvider>
          </WishlistProvider>
        </NotificationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
