import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "@features/auth/components/AuthForm.tsx";
import { AuthStackParamList } from "@navigation/types.ts";
import { colors } from "@shared/constants";

export interface RegisterScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, "Login">;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
});

export default function RegisterScreen(props: RegisterScreenProps) {
  const onClickNavigateToLoginScreen = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  // Render
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        type="register"
        onPressToggleMode={onClickNavigateToLoginScreen}
      />
    </SafeAreaView>
  );
}
