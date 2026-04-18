import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
  Button as ButtonNative,
  ButtonProps as ButtonNativeProps,
} from "react-native-paper";

import { textStyles } from "@shared/constants";

export interface ButtonProps extends Omit<ButtonNativeProps, "contentStyle"> {
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
}

export default function Button({ size = "large", ...props }: ButtonProps) {
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

  // Render
  const { buttonHeight, labelStyle } = resolveSizeStyle();
  return (
    <ButtonNative
      {...props}
      labelStyle={labelStyle}
      contentStyle={[{ height: buttonHeight }, props.style]}>
      {props.children}
    </ButtonNative>
  );
}
