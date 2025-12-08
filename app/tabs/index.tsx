// app/(tabs)/index.tsx
import { Text, View } from "react-native";

export default function HomeScreen() {
  console.log("Tabs index rendered");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome in Tabs 🎉</Text>
    </View>
  );
}
