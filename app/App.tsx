import "react-native-gesture-handler";

import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { toastConfig } from "@shared/components/core/Toast.tsx";
import { paperTheme } from "@shared/constants";
import { persistor, store } from "@store";

import AppNavigator from "./src/navigation/AppNavigator";

function AppContent() {
  const insets = useSafeAreaInsets();

  // Render
  return (
    <PaperProvider theme={paperTheme}>
      <AppNavigator />
      <Toast config={toastConfig} topOffset={insets.top + 12} />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView>
            <AppContent />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
