import React, { forwardRef, useRef, useState } from "react";
import type { TextInput as RNTextInput } from "react-native";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons/faCircleXmark";
import { faEye } from "@fortawesome/pro-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/pro-solid-svg-icons/faEyeSlash";
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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
     * Toggles password visibility.
     */
    const handleTogglePasswordVisibility = (): void => {
      setIsPasswordVisible(prev => !prev);
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
     * 1. `right` prop — if provided, always wins over `allowClear` and `secureTextEntry`
     * 2. Eye icon — rendered when `secureTextEntry` is true, toggles password visibility
     * 3. Clear icon — rendered when `allowClear` is true and the field has value or is focused
     * 4. `undefined` — no right adornment
     */
    const resolveRightProp = (): React.ReactNode => {
      if (props.right) {
        return props.right;
      }
      if (props.secureTextEntry) {
        if (isFocused || (props.value && props.value.length > 0)) {
          return (
            <TextInputNative.Icon
              forceTextInputFocus={false}
              onPress={handleTogglePasswordVisibility}
              icon={({ size, color }: { size: number; color: string }) => (
                <FontAwesomeIcon
                  size={size}
                  color={color}
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                />
              )}
            />
          );
        }
        return undefined;
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
        secureTextEntry={props.secureTextEntry && !isPasswordVisible}
        onBlur={handleBlur}
        onFocus={handleFocus}
        right={resolveRightProp()}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
