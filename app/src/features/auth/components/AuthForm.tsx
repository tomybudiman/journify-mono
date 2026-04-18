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
import { TextInput } from "react-native-paper";

import Button from "@shared/components/core/Button.tsx";
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
}

export default function AuthForm(props: AuthFormProps) {
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
            <TextInput style={styles.textInput} label="Name" mode="outlined" />
          )}
          <TextInput style={styles.textInput} label="Email" mode="outlined" />
          <TextInput
            mode="outlined"
            label="Password"
            style={styles.textInput}
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
          <Button size="large" mode="contained">
            Continue
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
