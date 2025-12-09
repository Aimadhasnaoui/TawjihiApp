import { User } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

function Welcom({ userName = "Utilisateur" }) {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Bonjour";
  if (hour >= 18) greeting = "Bonsoir";
  else if (hour < 6) greeting = "Bonne nuit";

  return (
    <View style={styles.gradient}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={24} color="white" />
        </View>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <Text style={styles.welcome}>Bienvenue sur votre tableau de bord</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    padding: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "#b0396b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  welcome: {
    color: "white",
    fontSize: 14,
    marginTop: 16,
  },
});

export default Welcom;
