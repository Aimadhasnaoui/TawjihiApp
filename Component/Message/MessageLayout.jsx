import { CheckCircle2, Clock, FileText, MailOpen, XCircle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function MessageLayout({ Message }) {
const statusConfig = {
  Accepté: {
    icon: CheckCircle2,
    label: "Accepté",
    bgColor: "#73AF6F",
    iconColor: "#73AF6F",
  },
  attente: {
    icon: Clock,
    label: "Liste d'attente",
    bgColor: "#1D546C",
    iconColor: "#1D546C",
  },
  Refusé: {
    icon: XCircle,
    label: "Refusé",
    bgColor: "#DC0000",
    iconColor: "#DC0000",
  },
  Inscription: {
    icon: FileText,
    label: "Inscription",
    bgColor: "#58277f",
    iconColor: "#58277f",
  },
  message: {
    icon: MailOpen,
    label: "Message",
    bgColor: "#b0396b",
    iconColor: "#b0396b",
  },
};


  const config = statusConfig[Message.Type] ?? statusConfig.message;
  const Icon = config.icon;
const date = new Date(Message.createdAt);
const monthsFr = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];


const day = date.getDate();              // 10
const month = monthsFr[date.getMonth()];;       // 12 (months start at 0)
const year = date.getFullYear();         // 2025

const formatted = `${day}/${month}/${year}`;
  return (
    <View style={styles.Gardient} className="shadow-sm mb-3">
      <View className="flex-row items-center gap-3">
        <View className={`px-3 py-3`} style={{borderRadius:6,backgroundColor: `${config.bgColor}20`}} >
          <Icon size={20} color={`${config.iconColor}`}  />
        </View>
         <View className="flex-1">
          <Text className="font-bold text-base">{Message.Titre}</Text>
        </View>
          <Text className={`${'px-3 py-1 rounded-full text-sm'}`} style={{color:`${config.iconColor}`,backgroundColor: `${config.bgColor}20`}}>{config.label}</Text>
      </View>
      <View  style={{marginTop:4,marginRight:4}}>
      <Text className={`text-xs text-gray-500 mt-1 `}>{formatted}</Text>
      </View>
        <View className="w-full mt-3" style={{ backgroundColor: "#f8f5f8",padding:6,borderRadius:6,marginLeft:4 }}>
          <Text className="text-sm text-gray-700 mt-1" style={{ color: '#374151'}}>{Message.Message}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Gardient: {
    padding: 16,
    backgroundColor: "white",
    borderRadius:6
  },
  // IconRound:{
  //   padding:4,
  //   borderRadius:6
  // }
});
