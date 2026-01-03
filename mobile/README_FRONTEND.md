# 📱 Product Review Application – Frontend (Mobile)

This folder contains the **mobile frontend** of the Product Review Application.  
The app is built using **React Native with Expo** and communicates with a Spring Boot backend via REST APIs.

---

## 🧱 Tech Stack

- React Native
- Expo
- TypeScript
- Context API
- React Navigation
- Expo Linear Gradient

---

## 📂 Project Structure (Mobile)

```
mobile/
├── components/
│   ├── AddReviewModal.tsx
│   ├── ProductCard.tsx
│   ├── ReviewCard.tsx
│   ├── RatingBreakdown.tsx
│   ├── StarRating.tsx
│   └── ...
├── screens/
│   ├── ProductListScreen.tsx
│   ├── ProductDetailsScreen.tsx
│   ├── NotificationsScreen.tsx
├── context/
│   ├── ToastContext.tsx
│   ├── NotificationContext.tsx
├── services/
│   └── api.ts
├── constants/
│   ├── theme.ts
│   ├── data.ts
├── index.ts
└── App.tsx
```

---

## ✅ Implemented Features

### Product Listing
- Displays products in card format
- Shows product image, name, price, rating
- Category-based filtering
- Search bar support

### Product Details
- Product description and pricing
- Rating summary and breakdown
- Review list
- “Add Review” action

### Add Review Flow
- Review is submitted through a **modal**
- Validation rules:
  - Rating is required
  - Review comment must be at least **10 characters**
- Validation feedback is shown via **toast notifications**

### Toast / Notification System
- Custom toast system using Context API
- Animated toast (slides from top)
- Toasts are rendered **inside the review modal layer**
  - Ensures toast appears on top of the modal on Android
- Used for validation errors and user feedback

### Notifications Screen
- Demo notification list (local state)
- Filterable by category (All / Reviews / System)
- Read/unread state handling
- Navigation to product details when applicable

---

## 🌐 Backend Connection

### ⚠️ Important – API Base URL

- The app currently uses a **LOCAL API URL** (temporary)
- This is required during local backend development
- **Today, the local URL will be replaced with a STATIC URL**
- Once the static URL is ready:
  - Update the base URL inside:
    ```
    services/api.ts
    ```

> The current local URL is temporary and should not be considered final.

---

## 📡 Local Development Notes

### Real Device vs Emulator
- If using a **real mobile device**, `localhost` will NOT work
- Use your computer’s local IP address instead
- Phone and computer must be on the **same network**

### Public / Cafe Wi-Fi
Some public networks block:
- LAN discovery
- WebSocket traffic (used by Expo)

If Expo does not connect:
```bash
npx expo start --tunnel
```

Or use your phone’s hotspot.

---

## ▶️ How to Run

```bash
cd mobile
npm install
npx expo start
```

Then:
- Press **a** to open Android emulator
- Or scan QR code using **Expo Go** on your phone

---

## 🧪 Known Limitations / TODO

- API base URL is currently local (static URL pending)
- Notifications are local demo data (not backend-driven)
- Pagination and sorting depend on backend support
- “Helpful” action on reviews is UI-only for now

---

## 📝 Notes

This frontend focuses on:
- Clean UI
- Stable user feedback
- Correct modal and overlay behavior (especially on Android)
- Clear separation of concerns (components / screens / context)

Backend responsibilities (authentication, persistence, business rules)
are intentionally kept out of the frontend scope.

---

## 👨‍💻 Author

Intern Project – Product Review Application  
Frontend implemented as part of internship assignment.
