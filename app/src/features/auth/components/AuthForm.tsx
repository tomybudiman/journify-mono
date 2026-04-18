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
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Controller } from "react-hook-form";

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
  textInput: {
    backgroundColor: colors.surface,
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
  const getHeroMessageText = (): string => {
    switch (props.type) {
      case "register":
        return "Sign Up";
      case "login":
        return "Sign In";
    }
  };
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
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Name"
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  allowClear={true}
                  autoCapitalize="words"
                  onChangeText={onChange}
                  style={styles.textInput}
                />
              )}
            />
          )}
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                label="Email"
                mode="outlined"
                onBlur={onBlur}
                allowClear={true}
                autoCapitalize="none"
                onChangeText={onChange}
                style={styles.textInput}
                keyboardType="email-address"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                mode="outlined"
                onBlur={onBlur}
                label="Password"
                allowClear={true}
                secureTextEntry={true}
                onChangeText={onChange}
                style={styles.textInput}
              />
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
