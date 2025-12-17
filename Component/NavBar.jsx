import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import Logo from "../assets/images/logo.png";

export default function NavBar() {
  const user = "";
  const router = useRouter();

  const handleNavigateToChoix = () => {
    router.push("/tabs/CHOIXstudent");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#b0396b",
      }}
      className="px-4 py-3 shadow-lg"
    >
      <Pressable className="p-2 active:opacity-70">
        <Image
          source={Logo}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </Pressable>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {/* Add Icon Button */}
        <Pressable
          onPress={handleNavigateToChoix}
          className="p-2 active:opacity-70"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 20,
            padding: 8,
          }}
        >
          <Plus color="white" size={24} />
        </Pressable>
      </View>
    </View>
  );
}
