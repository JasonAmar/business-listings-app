# Mini Business Listing & Discovery App

A React Native app for adding and discovering local business listings. Built with TypeScript and Expo.

## 🚀 How to Run Locally

### Prerequisites

1. **Node.js & npm**: Ensure you have Node.js (v16+) and npm installed. [Download here](https://nodejs.org/).
   - Verify installation: `node --version` and `npm --version`
2. **Expo Go App**: Download the free "Expo Go" app on your device:
   - [iOS App Store](https://apps.apple.com/us/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
3. **Internet Connection**: Your development machine and mobile device must be on the same network.

### Installation & Setup

1. **Clone or Download the Project**:

   ```bash
   # If cloning from git
   git clone <repository-url>
   cd business-listings-app

   # Or if downloaded as a zip, extract it and navigate to the folder
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This installs all required packages including Expo CLI, React Native, and SQLite support.

### Running the App

1. **Start the Development Server**:

   ```bash
   npx expo start
   ```

   Wait for the server to initialize. You should see a QR code in the terminal along with options to press:

   - `a` - Open in Android Emulator
   - `i` - Open in iOS Simulator
   - `w` - Open in web browser

2. **Connect Your Device**:

   **Android:**

   - Open the **Expo Go** app on your Android device
   - Tap the **Scan QR code** button
   - Point your camera at the QR code displayed in the terminal
   - The app will load automatically

   **iOS:**

   - Open the **Camera** app on your iPhone
   - Point it at the QR code in the terminal
   - Tap the notification that appears
   - The app will open in Expo Go

   Alternatively, you can manually enter the connection URL if scanning doesn't work.

3. **Explore the App**:
   - Browse existing business listings on the home screen
   - Use the search bar to filter listings by keyword
   - Create new listings by tapping the create button

### Troubleshooting

- **QR Code not scanning?** Make sure both your development machine and mobile device are connected to the same WiFi network.
- **Port already in use?** The default port is 8081. If it's in use, Expo will prompt you to use an alternative port.
- **App won't load?** Try restarting the Expo server by pressing `Ctrl+C` and running `npx expo start` again.
- **Still having issues?** Check that you have the latest version of Expo Go and Node.js installed.

## 🏗️ Architecture & Decisions

### Technology Stack Rationale

- **React Native & Expo:** Chosen as the foundation to enable a single codebase that deploys natively to both Android and iOS platforms. This approach significantly reduces development time and maintenance overhead by writing the core business logic once while leveraging platform-specific optimizations. React Native opens the door for future web app development using React, ensuring consistent technology across all client platforms (mobile and web). This unified approach creates opportunities for building a cohesive design system that spans all platforms, leading to better UX consistency and reduced design-to-code time.

- **Data Handling & Persistence:** The application uses `expo-sqlite` for persistent data storage via custom hooks (e.g., `use-storage.ts`), providing a robust relational database layer with SQLite. By encapsulating storage logic in custom hooks, the application achieves a clean separation of concerns. This approach allows the storage implementation to change without requiring significant modifications throughout the codebase and supports higher-frequency changes to the storage layer while avoiding the significant boilerplate and complexity associated with full state management solutions like Redux. SQLite enables complex queries, data relationships, and transactions, which simple key-value storage cannot provide. By implementing SQLite from the start, the application is built on a scalable foundation that can grow with increasing data complexity and query requirements. Custom hooks provide an elegant, composable pattern that scales well for MVP and early-stage products.

- **Navigation:** `Expo Router` (Stack). Standard implementation for linear flows in Expo project.

- **UI/UX:** Custom components using standard `StyleSheet`. No heavy UI libraries were used to keep the bundle size small and minimize dependencies.

## 🛠️ Trade-offs (MVP Scope)

- **Validation:** Basic "non-empty" checks only. Input validation is minimal to prioritize rapid MVP development. More robust validation will be added in future versions.
- **Category Selection:** Preset categories with free-text fallback trades depth for simplicity and speed of implementation by having no validation, duplication handling, or centralized management. Users can create unlimited custom categories, risking data inconsistency. A proper taxonomy would require backend support, adding complexity unsuitable for MVP scope.
- **Search:** Implemented as a client-side filter. For an MVP with limited data, client-side filtering is performant and reduces backend complexity. As the dataset grows, this would become a bottleneck.
- **UI Library:** Minimal external UI dependencies. Only `@expo/vector-icons` for icons and `react-native-toast-message` for notifications are used. Custom components built with standard `StyleSheet` keep the codebase lightweight while maintaining a polished user experience ideal for rapid MVP iteration.
- **State Persistence Queries:** Current implementation handles all data queries on the client side using SQLite. This allowed for quick development but exposes a potential risk for SQL injections. Implementing a backend API would allow for query optimization and enhanced security as the dataset and user base grow.

## 🚀 Future Improvements (V2 & Beyond)

- **Backend Integration & User Management:** Implement backend API layer with a database and user authentication to enable entry ownership tracking and persistence. Add edit/delete capabilities for user-owned listings. Integrate schema validation (Zod/Yup), upgrade category selection to controlled Dropdown/Picker, and optimize SQLite with indexed queries and migrations.

- **Location Services & Design System:** Add geolocation and maps integration (`react-native-maps`) for location-based search and visual listing display. Develop a unified design system for web, iOS, and Android platforms using React Native Web for code sharing.
