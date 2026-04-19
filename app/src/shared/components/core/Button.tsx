import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
  Button as ButtonNative,
  ButtonProps as ButtonNativeProps,
  useTheme,
} from "react-native-paper";

import { colors, textStyles } from "@shared/constants";

export interface ButtonProps extends Omit<ButtonNativeProps, "contentStyle"> {
  variant?: "primary" | "secondary" | "error" | "warning" | "success";
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  size = "large",
  variant = "primary",
  ...props
}: ButtonProps) {
  const theme = useTheme();

  /**
   * Resolves button height and label style based on the size prop.
   */
  const resolveSizeStyle = (): { buttonHeight: number; labelStyle: object } => {
    switch (size) {
      case "small":
        return { buttonHeight: 32, labelStyle: { ...textStyles.labelSmall } };
      case "medium":
        return { buttonHeight: 40, labelStyle: { ...textStyles.labelMedium } };
      case "large":
      default:
        return { buttonHeight: 48, labelStyle: { ...textStyles.labelLarge } };
    }
  };

  /**
   * Resolves button background and text colors based on variant and mode.
   */
  const resolveColors = () => {
    let baseColor: string = theme.colors.primary;
    let onBaseColor: string = theme.colors.onPrimary;
    switch (variant) {
      case "secondary":
        baseColor = theme.colors.secondary;
        onBaseColor = theme.colors.onSecondary;
        break;
      case "error":
        baseColor = theme.colors.error;
        onBaseColor = theme.colors.onError;
        break;
      case "warning":
        baseColor = colors.warning;
        onBaseColor = colors.surface;
        break;
      case "success":
        baseColor = colors.success;
        onBaseColor = colors.surface;
        break;
      case "primary":
        baseColor = theme.colors.primary;
        onBaseColor = theme.colors.onPrimary;
        break;
    }
    const isContained: boolean =
      props.mode === "contained" || props.mode === "elevated";
    return {
      resolvedButtonColor: isContained ? baseColor : undefined,
      resolvedTextColor: isContained ? onBaseColor : baseColor,
      resolvedBorderColor: props.mode === "outlined" ? baseColor : undefined,
    };
  };

  // Render
  const { buttonHeight, labelStyle } = resolveSizeStyle();
  const { resolvedButtonColor, resolvedTextColor, resolvedBorderColor } =
    resolveColors();
  return (
    <ButtonNative
      {...props}
      contentStyle={{ height: buttonHeight }}
      labelStyle={[labelStyle, props.labelStyle]}
      textColor={props.textColor || resolvedTextColor}
      buttonColor={props.buttonColor || resolvedButtonColor}
      style={[
        props.mode === "outlined" && { borderColor: resolvedBorderColor },
        props.style,
      ]}>
      {props.children}
    </ButtonNative>
  );
}
