import React from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Controller, FieldError } from "react-hook-form";

import {
  AuthFormValues,
  useAuthForm,
} from "@features/auth/hooks/useAuthForm.ts";
import Button from "@shared/components/core/Button.tsx";
import TextInput from "@shared/components/core/TextInput.tsx";
import { colors, textStyles } from "@shared/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topContainer: {
    gap: 16,
    paddingTop: 96,
    position: "relative",
  },
  bottomContainer: {
    gap: 12,
  },
  appIconImage: {
    top: 16,
    right: 0,
    width: 32,
    height: 32,
    position: "absolute",
  },
  heroText: {
    color: colors.primary,
    ...textStyles.displayLarge,
  },
  textInputContainer: {
    gap: 8,
  },
  textInput: {
    backgroundColor: colors.surface,
  },
  textInputErrorMessage: {
    color: colors.error,
    ...textStyles.caption,
  },
  footerMessageContainer: {
    gap: 4,
    flexDirection: "row",
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  footerMessageText: {
    ...textStyles.labelLarge,
  },
  footerMessageLinkText: {
    color: colors.primary,
    ...textStyles.labelLarge,
  },
});

export interface AuthFormProps {
  type: "login" | "register";
  onPressToggleMode?: () => void;
  onSubmit: (data: AuthFormValues) => void;
}

export default function AuthForm(props: AuthFormProps) {
  const { control, handleSubmit, isValid, isSubmitting } = useAuthForm(
    props.type,
  );

  /**
   * @description Returns the hero message text based on the form type.
   */
  const getHeroMessageText = (): string => {
    switch (props.type) {
      case "register":
        return "Sign Up";
      case "login":
        return "Sign In";
    }
  };

  /**
   * @description Returns the footer message label and link text based on the form type.
   */
  const getFooterMessageObject = (): Record<"label" | "link", string> => {
    switch (props.type) {
      case "login":
        return {
          label: "Don't have an account?",
          link: "Sign Up",
        };
      case "register":
        return {
          label: "Already have an account?",
          link: "Sign In",
        };
    }
  };

  /**
   * Resolves the error message with the following priority:
   * 1. Custom message — if provided in the field's validation rules
   * 2. Generic message — mapped from the error type
   * 3. Fallback — "Invalid value"
   */
  const resolveErrorMessage = (error: FieldError): string => {
    if (error.message) {
      return error.message;
    }
    switch (error.type) {
      case "required":
        return "This field is required.";
      case "pattern":
        return "Invalid format.";
      default:
        return "Invalid value.";
    }
  };

  // Render
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            style={styles.appIconImage}
            source={require("@shared/assets/images/journify-icon-512.png")}
          />
          <Text style={styles.heroText}>{getHeroMessageText()}</Text>
          {props.type === "register" && (
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <View style={styles.textInputContainer}>
                  <TextInput
                    label="Name"
                    value={value}
                    mode="outlined"
                    onBlur={onBlur}
                    allowClear={true}
                    autoCapitalize="words"
                    onChangeText={onChange}
                    style={styles.textInput}
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <Text style={styles.textInputErrorMessage}>
                      {fieldState.error &&
                        resolveErrorMessage(fieldState.error)}
                    </Text>
                  )}
                </View>
              )}
            />
          )}
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <View style={styles.textInputContainer}>
                <TextInput
                  value={value}
                  label="Email"
                  mode="outlined"
                  onBlur={onBlur}
                  allowClear={true}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  style={styles.textInput}
                  error={!!fieldState.error}
                  keyboardType="email-address"
                />
                {fieldState.error && (
                  <Text style={styles.textInputErrorMessage}>
                    {fieldState.error && resolveErrorMessage(fieldState.error)}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <View style={styles.textInputContainer}>
                <TextInput
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  label="Password"
                  allowClear={true}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  style={styles.textInput}
                  error={!!fieldState.error}
                />
                {fieldState.error && (
                  <Text style={styles.textInputErrorMessage}>
                    {fieldState.error && resolveErrorMessage(fieldState.error)}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.footerMessageContainer}>
            <Text style={styles.footerMessageText}>
              {getFooterMessageObject().label}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={props.onPressToggleMode}>
              <Text style={styles.footerMessageLinkText}>
                {getFooterMessageObject().link}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            size="large"
            mode="contained"
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(props.onSubmit)}>
            Continue
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
