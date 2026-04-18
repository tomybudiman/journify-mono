import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "@features/auth/components/AuthForm.tsx";
import { AuthFormValues } from "@features/auth/hooks/useAuthForm";
import { registerThunk } from "@features/auth/store/authThunks";
import { AuthStackParamList } from "@navigation/types.ts";
import { colors } from "@shared/constants";
import { useAppDispatch } from "@shared/hooks/useAppDispatch.ts";

export interface RegisterScreenProps {
  navigation: StackNavigationProp<AuthStackParamList, "Register">;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
});

export default function RegisterScreen(props: RegisterScreenProps) {
  const dispatch = useAppDispatch();

  /**
   * @description Navigates to the Login screen and resets the navigation stack
   */
  const onClickNavigateToLoginScreen = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  /**
   * @description Dispatches the register thunk with the submitted form values
   */
  const onSubmit = async (data: AuthFormValues) => {
    await dispatch(
      registerThunk({
        name: data.name as string,
        email: data.email,
        password: data.password,
      }),
    );
  };

  // Render
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        type="register"
        onSubmit={onSubmit}
        onPressToggleMode={onClickNavigateToLoginScreen}
      />
    </SafeAreaView>
  );
}
