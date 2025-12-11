import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RegisterLayout() {
  return (
    <>
      <StatusBar backgroundColor="#b0396b" barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}