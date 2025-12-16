// app/(tabs)/index.tsx
import { ScrollView } from "react-native";
import EcoleInfo from "../../Component/Home/EcoleInfo";
import ExamanCount from "../../Component/Home/ExamanCount";
import Welcom from "../../Component/Home/Welcom";
export default function HomeScreen() {
  // const { user } = useAuth();
  return (
    <ScrollView style={{ flex: 1 }}>
      <Welcom ></Welcom>
      <ExamanCount></ExamanCount>
      <EcoleInfo></EcoleInfo>
    </ScrollView>
  );
}
