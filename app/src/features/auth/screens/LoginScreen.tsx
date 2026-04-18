import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "@features/auth/components/AuthForm.tsx";
import { AuthFormValues } from "@features/auth/hooks/useAuthForm";
import { loginThunk } from "@features/auth/store/authThunks";
import { AuthStackParamList } from "@navigation/types.ts";
import { colors } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";

export interface LoginScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, "Login">;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
});

export default function LoginScreen(props: LoginScreenProps) {
  const dispatch = useAppDispatch();

  /**
   * @description Navigates to the Register screen and resets the navigation stack
   */
  const onClickNavigateToRegisterScreen = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Register" }],
    });
  };

  /**
   * @description Dispatches the login thunk with the submitted form values
   */
  const onSubmit = async (data: AuthFormValues) => {
    await dispatch(loginThunk({ email: data.email, password: data.password }));
  };

  // Render
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        type="login"
        onSubmit={onSubmit}
        onPressToggleMode={onClickNavigateToRegisterScreen}
      />
    </SafeAreaView>
  );
}
