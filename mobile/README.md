# Mobile Application – Frontend

## Overview
This directory contains the mobile frontend of the Product Review Application. The app is built using React Native and Expo and communicates with the Spring Boot backend through REST APIs.

---

## Tech Stack
- React Native
- Expo
- TypeScript
- React Navigation
- Context API

---

## Folder Structure

```
mobile/
 ├─ assets/           # Static assets
 ├─ components/       # Reusable UI components
 ├─ constants/        # Theme and static data
 ├─ context/          # Global state management
 ├─ hooks/            # Custom hooks
 ├─ screens/          # Screen-level components
 ├─ services/         # API communication
 ├─ types/            # TypeScript definitions
 ├─ App.tsx           # Root component
 ├─ index.ts          # Entry point
```

---

## Application Entry
- `index.ts` registers the root component with Expo
- `App.tsx` initializes:
  - SafeAreaProvider
  - NotificationContext
  - ToastContext
  - NavigationContainer

---

## Navigation
The app uses a native stack navigator with the following screens:
- ProductListScreen
- ProductDetailsScreen
- NotificationsScreen (modal-style)

---

## State Management
Global state is handled using React Context:
- NotificationContext manages notification data
- ToastContext manages user feedback messages

---

## Data Handling
- API communication is centralized in `services/api.ts`
- Supports both static/mock data and backend integration
- Error handling is abstracted from UI components

---

## Platform Support
- Android: Tested on real device via Expo Go
- Web: Used for layout sanity checks
- iOS: Architecture compatible; pending physical device testing

---

## Running the App

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code using Expo Go to run the app on a physical device.

---

## Notes
- Backend must be running for live API integration
- Static data can be used during frontend development

