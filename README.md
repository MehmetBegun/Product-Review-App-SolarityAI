# 📱 Product Review Application

**Backend:** Spring Boot  
**Mobile App:** React Native (Expo)  
**Web:** React Native Web  
**Authentication:** Not included (out of scope)

---

## 📌 Project Overview

The **Product Review Application** is a full-stack system that allows users to browse products, submit reviews, rate products, and view aggregated feedback through a modern mobile and web interface.  
The project focuses on **core backend logic, REST API design, data modeling, and mobile UI/UX**, intentionally excluding authentication to keep the scope implementation-focused.

---

## 🎯 Objectives

- Build a scalable RESTful backend using **Spring Boot**
- Develop a cross-platform mobile application using **React Native**
- Deploy a web-accessible version using **React Native Web**
- Allow users to:
  - View products
  - Submit reviews and ratings
  - Browse existing reviews
- Demonstrate clean architecture and separation of concerns

---

## 🧩 Core Features

### 🛒 Product Management
- Retrieve a list of products
- **Server-side Filtering:** Filter products by category (e.g., Tablets, Gaming)
- View product details:
  - Name, Description, Category, Price, Image
  - Average rating & Review count
- Backend supports pagination and sorting

### ⭐ Review & Rating System
- Users can:
  - Submit a text-based review
  - Rate products on a numeric scale (e.g., 1–5)
- **Rating Breakdown:** Visual bar chart showing the distribution of ratings (calculated server-side)
- **Advanced Filtering:** Filter reviews by star rating (e.g., show only 5-star reviews)
- **Pagination:** "Load More" functionality for efficient data fetching

### 📊 Aggregation & Insights
- Backend calculates:
  - Average ratings
  - Review counts
  - Rating distribution (Histogram)
- Optimized for read-heavy access patterns

### 📱 Mobile & Web Experience
- Cross-platform support (iOS, Android, Web)
- Key screens:
  - Product List (with Category Filter)
  - Product Details (with Rating Breakdown)
  - Add Review Modal
- Reusable UI components
- API-driven data rendering
- Loading and error states handled gracefully

---

## 🏗️ Architecture

### Backend (Spring Boot)
- RESTful API architecture
- Layered structure: Controller, Service, Repository
- JPA / Hibernate for ORM
- **H2 Database** (In-memory for dev/demo)
- **Deployed on Heroku**
- DTO-based request/response models
- Input validation (ratings range, review length, etc.)

### Mobile App (React Native)
- Functional components with hooks
- API integration using `fetch`
- **Server-side Pagination & Filtering** integration
- **Deployed on Vercel** (Web version)

---

## 🚀 Deployment

### Backend
The backend is deployed on **Heroku**.
- Base URL: `https://product-review-app-solarityai-a391ad53d79a.herokuapp.com`

### Web App
The web version is deployed on **Vercel**.
- Public URL: [Your Vercel Link Here] (e.g., `https://product-review-app.vercel.app`)

### Mobile App (APK)
- Built using **EAS Build** (Expo Application Services).
- APK can be generated for Android testing.

---

## 🛠️ How to Run Locally

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Mobile / Web
```bash
cd mobile
npm install
npx expo start
```
- Press `w` for Web
- Press `a` for Android (Emulator)
- Scan QR code for iOS (Expo Go)

---

## 🚫 Out of Scope
- Authentication & authorization
- User accounts or roles
- Payments or checkout
- Admin dashboards

---

## 🧪 Testing & Quality
- Unit tests for service and repository layers
- Integration tests for REST endpoints
- Validation and error handling
- Consistent API response formats

---

## 💡 Why This Project

This project demonstrates:
- Strong **Spring Boot backend fundamentals**
- Clean **REST API design** (Pagination, Filtering, Aggregation)
- Practical **React Native mobile & web development**
- Scalable architecture patterns used in real-world applications
