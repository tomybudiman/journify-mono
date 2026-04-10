import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "@features/auth/screens/LoginScreen";
import RegisterScreen from "@features/auth/screens/RegisterScreen";

import { AuthStackParamList } from "./types";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
