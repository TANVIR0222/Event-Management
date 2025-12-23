# Paidego 🏆

A modern React Native mobile application for organizing and participating in sports events. Built with Expo, Paidego connects athletes, organizers, and sports enthusiasts through a comprehensive event management platform.


## App Screenshots

<img width="320" height="570" alt="Discover (1)" src="https://github.com/user-attachments/assets/364cbba3-1283-4381-a5d6-5ce8a4ec6e33" />

<img width="320" height="570" alt="Near Me" src="https://github.com/user-attachments/assets/d7b77d1f-7439-4c1c-856b-03ec6099f05e" />

<img width="320" height="570" alt="Discover (1)" src="https://github.com/user-attachments/assets/fa32625a-5a12-4e15-b05f-f7b75f115f38" />

<img width="320" height="570" alt="Offiline Payment Procedure" src="https://github.com/user-attachments/assets/40a0e749-3023-465d-be8e-a637fc6ce2b7" />

<img width="320" height="570" alt="Transaction (Insufficient Balance)" src="https://github.com/user-attachments/assets/d91a5484-7f6c-47e3-9dd2-84926fbc9213" />

<img width="320" height="570" alt="Leaderboard" src="https://github.com/user-attachments/assets/6f1f72ab-9d9d-4e67-b84c-2c5a8eda8b88" />



## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Screenshots](#screenshots)
- [License](#license)

## 🎯 Overview

Paidego is a comprehensive sports event management application that enables users to:
- Discover and join sports events in their area
- Create and manage sports competitions
- Track performance and view leaderboards
- Connect with other athletes and teams
- Handle event registrations and transactions

The app provides a seamless experience for both event organizers and participants, with real-time updates, location-based event discovery, and integrated payment processing.

## 🛠 Tech Stack

### Core Technologies
- **React Native** (0.79.6) - Cross-platform mobile development
- **Expo** (~53.0.25) - Development platform and tooling
- **TypeScript** (~5.8.3) - Type-safe JavaScript
- **Expo Router** (~5.1.10) - File-based navigation

### State Management & API
- **Redux Toolkit** (^2.11.1) - State management
- **React Redux** (^9.2.0) - React bindings for Redux
- **Axios** (^1.13.2) - HTTP client

### UI & Styling
- **React Native Reanimated** (~3.17.4) - Smooth animations
- **React Native Gesture Handler** (~2.24.0) - Touch gestures
- **Lucide React Native** (^0.554.0) - Icon library
- **twrnc** (^4.9.1) - Tailwind CSS for React Native
- **Expo Linear Gradient** (^15.0.8) - Gradient components

### Maps & Location
- **React Native Maps** (1.20.1) - Map integration
- **Expo Location** (~18.1.6) - Location services

### Forms & Validation
- **Formik** (^2.4.9) - Form management
- **Yup** (^1.7.1) - Schema validation

### Additional Features
- **Expo Image Picker** (~16.1.4) - Image selection
- **React Native WebView** (13.13.5) - In-app browser
- **@react-native-google-signin/google-signin** (^16.0.0) - Google authentication
- **@react-native-async-storage/async-storage** (2.1.2) - Local storage

## ✨ Key Features

### For Athletes & Players
- 🔍 **Event Discovery** - Browse and search for sports events near you
- 📍 **Location-Based Search** - Find events based on your current location
- 👥 **Team Management** - Create and join teams for competitions
- 📊 **Performance Tracking** - Monitor your stats and achievements
- 🏆 **Leaderboards** - Compete and see rankings
- 🔔 **Notifications** - Stay updated on event changes and announcements

### For Event Organizers
- ➕ **Event Creation** - Create and customize sports events
- 📝 **Registration Management** - Track and manage participant registrations
- 💰 **Payment Integration** - Handle event fees and transactions
- 🎯 **Winner Selection** - Manage competition results
- 📈 **Event Analytics** - View event performance metrics

### General Features
- 🔐 **Secure Authentication** - Sign up/in with email or Google
- 👤 **User Profiles** - Customizable user profiles with stats
- 💬 **Social Features** - Follow other users and share events
- 🌙 **Dark Mode Support** - Automatic theme switching
- 📱 **Responsive Design** - Optimized for all screen sizes

## 📁 Project Structure

```
paidego/
├── app/                          # Main application screens (Expo Router)
│   ├── (drawer)/                 # Drawer navigation screens
│   │   └── (tabs)/              # Bottom tab navigation
│   │       ├── home.tsx         # Home/events feed
│   │       ├── createevent.tsx  # Event creation
│   │       ├── nearme.tsx       # Location-based events
│   │       ├── leaderboard.tsx  # Rankings
│   │       ├── performence.tsx  # Performance stats
│   │       ├── transaction.tsx  # Payment history
│   │       └── profile.tsx      # User profile
│   ├── auth/                    # Authentication screens
│   │   ├── signIn.tsx
│   │   ├── signUp.tsx
│   │   ├── forgotPassword.tsx
│   │   └── otpVerify.tsx
│   ├── eventDetails/            # Event detail screens
│   ├── modals/                  # Modal screens
│   ├── onboarding/              # Onboarding flow
│   ├── profile/                 # Profile management
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable UI components
│   ├── ui/                      # UI component library
│   ├── CustomTabBar.tsx
│   ├── PlayerEventCard.tsx
│   └── Mainbutton.tsx
├── redux/                        # Redux state management
│   ├── authApi/                 # Authentication API
│   ├── createEvent/             # Event management API
│   ├── discover/                # Event discovery API
│   ├── nearme/                  # Location-based API
│   ├── myProfile/               # Profile API
│   ├── notificationsApi/        # Notifications API
│   ├── transaction/             # Payment API
│   └── store/                   # Redux store configuration
├── lib/                          # Utility functions
│   ├── lib.ts                   # Helper functions
│   └── tailwind.ts              # Tailwind config
├── interface/                    # TypeScript interfaces
├── schema/                       # Validation schemas
├── assets/                       # Images, fonts, icons
├── android/                      # Android native code
├── app.config.js                # Expo configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Expo CLI** - Will be installed with dependencies
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **Xcode** (for iOS development, macOS only) - [Download](https://developer.apple.com/xcode/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd padigo-Zaid-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file and add your API keys:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your actual values (see [Environment Variables](#environment-variables) section below).

4. **Set up Google Services (Firebase)**
   
   The app uses Firebase for authentication and other services. You'll need to set up your own Firebase project:
   
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Add an Android app to your Firebase project
   - Download `google-services.json` for Android
   - Replace the existing `google-services.json` in the project root with your own
   
   > **Note**: The `google-services.json` file contains Firebase configuration (not secret keys) and is safe to commit. However, for production apps, you should use your own Firebase project configuration.

5. **Prebuild native projects** (if needed)
   
   If you've made changes to native configuration:
   ```bash
   npx expo prebuild --clean
   ```
   
   This will regenerate the `android/` and `ios/` directories with your environment variables.

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Google Maps API Key
# Get your key from: https://console.cloud.google.com/google/maps-apis
# Required APIs: Maps SDK for Android, Maps SDK for iOS, Places API
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**How to get a Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Places API
4. Go to "Credentials" and create an API key
5. Copy the API key to your `.env` file

> ⚠️ **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## 🏃 Running the App

### Development Mode

Start the Expo development server:

```bash
npm start
```

This will open the Expo Developer Tools in your browser. From here, you can:
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator (macOS only)
- Scan the QR code with the Expo Go app on your physical device

### Platform-Specific Commands

**Android:**
```bash
npm run android
```

**iOS (macOS only):**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

### Development Build

For a development build with native modules:

```bash
npx expo run:android
# or
npx expo run:ios
```

## 📦 Building for Production

### Using EAS Build (Recommended)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure build**
   ```bash
   eas build:configure
   ```

4. **Build for Android**
   ```bash
   eas build --platform android
   ```

5. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

### Local Build

**Android APK:**
```bash
npx expo build:android
```

**iOS IPA:**
```bash
npx expo build:ios
```

## 📸 Screenshots

> Screenshots will be added here once available

<!-- 
Example layout:
| Home Screen | Event Details | Profile |
|-------------|---------------|---------|
| ![Home](screenshots/home.png) | ![Event](screenshots/event.png) | ![Profile](screenshots/profile.png) |
-->

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ using React Native and Expo**
