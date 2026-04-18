import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAppSelector } from "@shared/hooks/useAppSelector";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const isAuthenticated: boolean = useAppSelector(
    state => state.auth.isAuthenticated,
  );
  // Render
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
