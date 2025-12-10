import { LinearGradient } from "expo-linear-gradient";
import { Building2, CheckCircle2 } from "lucide-react-native";
import { Text, View } from "react-native";
export default function EcoleInfo() {
  return (
    <View
      className="bg-white rounded-2xl p-5 shadow-sm border border-border"
      style={{ margin: 8 }}
    >
      <View
        className="flex-row items-center"
        style={{ marginBottom: 10, gap: 3 }}
      >
        {/* Icon background with gradient */}
        <LinearGradient
          colors={["#b0396b", "#58277f"]}
          style={{ paddingHorizontal: 5, paddingVertical: 4, borderRadius: 10 }}
          className="w-10 h-10  items-center justify-center"
        >
          <Building2 size={20} color="#ffffff" />
        </LinearGradient>

        <View>
          <Text className="font-semibold">Écoles</Text>
          <Text className="text-xs text-muted-foreground">Statistiques</Text>
        </View>
      </View>
      <View className="" style={{backgroundColor:"#f8f5f8",marginBottom:10,gap:4,borderRadius:10,padding:10}}  >
        <View className="flex-row gap-[4px] items-center" style={{gap:3}}>
          <Building2 size={20} color="#b0396b" />
          <Text className="font-sm" style={{color:"#69606b"}}>Total</Text>
        </View>
        <Text className="font-bold text-3xl mt-2">150</Text>
        <Text className="font-sm text-sm mt-2" style={{color:"#69606b"}}>écoles disponibles</Text>
      </View>
      <View className="" style={{backgroundColor:"#f8f5f8",marginBottom:10,gap:3,borderRadius:10,padding:10}}  >
        <View className="flex-row gap-[4px] items-center" style={{gap:3}}>
          <CheckCircle2 size={20} color="#5CE65C" />
          <Text className="font-sm" style={{color:"#69606b"}}>Choisies</Text>
        </View>
        <Text className="font-bold text-3xl mt-2">12</Text>
        <Text className="font-sm text-sm mt-2" style={{color:"#69606b"}}>écoles sélectionnées</Text>
      </View>
    </View>
  );
}
