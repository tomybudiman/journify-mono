import { createStackNavigator } from "@react-navigation/stack";

import { AuthStackParamList } from "./types";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="Register" />
    </Stack.Navigator>
  );
}
