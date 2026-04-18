import React, { forwardRef, useRef, useState } from "react";
import type { TextInput as RNTextInput } from "react-native";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  TextInput as TextInputNative,
  TextInputProps as TextInputNativeProps,
} from "react-native-paper";

export interface TextInputProps extends TextInputNativeProps {
  allowClear?: boolean;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ allowClear, ...props }, forwardedRef) => {
    const inputRef = useRef<RNTextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    /**
     * Assigns both the internal and forwarded ref to the same node.
     */
    const resolveRef = (node: RNTextInput | null): void => {
      (inputRef as React.RefObject<RNTextInput | null>).current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.RefObject<RNTextInput | null>).current = node;
      }
    };

    /**
     * Clears the field value and restores focus.
     */
    const handleClear = (): void => {
      if (props.onChangeText) {
        props.onChangeText("");
      }
      inputRef.current?.focus();
    };

    /**
     * Handles focus event and delegates to the original onFocus prop.
     */
    const handleFocus = (
      e: Parameters<NonNullable<TextInputNativeProps["onFocus"]>>[0],
    ): void => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    /**
     * Handles blur event and delegates to the original onBlur prop.
     */
    const handleBlur = (
      e: Parameters<NonNullable<TextInputNativeProps["onBlur"]>>[0],
    ): void => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    /**
     * Resolves the right prop with the following priority:
     * 1. `right` prop — if provided, always wins over `allowClear`
     * 2. Clear icon — rendered when `allowClear` is true and the field has value or is focused
     * 3. `undefined` — no right adornment
     */
    const resolveRightProp = (): React.ReactNode => {
      if (props.right) {
        return props.right;
      }
      if (allowClear && isFocused && props.value && props.value.length > 0) {
        return (
          <TextInputNative.Icon
            onPress={handleClear}
            icon={({ size, color }: { size: number; color: string }) => (
              <FontAwesomeIcon size={size} color={color} icon={faCircleXmark} />
            )}
          />
        );
      }
      return undefined;
    };

    // Render
    return (
      <TextInputNative
        {...props}
        ref={resolveRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        right={resolveRightProp()}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
