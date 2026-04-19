import Toast from "react-native-toast-message";

export const toastService = {
  success: (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
      visibilityTime: 3000,
      onPress: () => Toast.hide(),
    });
  },
  error: (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
      visibilityTime: 4000,
      onPress: () => Toast.hide(),
    });
  },
  info: (message: string) => {
    Toast.show({
      type: "info",
      text1: message,
      visibilityTime: 3000,
      onPress: () => Toast.hide(),
    });
  },
};
