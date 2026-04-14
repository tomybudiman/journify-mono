import Config from "react-native-config";
import * as Keychain from "react-native-keychain";

const TOKEN_KEY = Config.TOKEN_KEY as string;

export const tokenService = {
  saveToken: async (token: string): Promise<void> => {
    await Keychain.setGenericPassword(TOKEN_KEY, token);
  },

  getToken: async (): Promise<string | null> => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) return credentials.password;
    return null;
  },

  removeToken: async (): Promise<void> => {
    await Keychain.resetGenericPassword();
  },
};
