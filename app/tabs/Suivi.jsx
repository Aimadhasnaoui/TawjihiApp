import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Suivi() {
  const [activeTab, setActiveTab] = useState("annonces");
  const TABS = [
    { key: "choisi", label: "Choisi" },
    { key: "inscrit", label: "Inscrit" },
    { key: "accepte", label: "Accepté" },
    { key: "refuse", label: "Refusé" },
    { key: "liste_attente", label: "Liste d’attente" },
  ];
  return (
    <View>
      <View
        className="bg-[#b0396b] pt-2 pb-6 px-6 shadow-lg"
        style={styles.Gardient}
      >
        <Text className="text-white text-3xl font-bold">Établissement</Text>
        <Text className="text-white/80 text-sm mt-1">
          Cette section vous permet de suivre la vie de votre école.
        </Text>
      </View>
      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Content */}
      {/* {activeTab === "annonces" ? <AnnoncesTab /> : <EcoleTab />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  Gardient: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    backgroundColor: "#b0396b",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },

  tabsRow: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 10,
    alignItems: "center",
  },
  tab: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#e7e7e7",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#b0396b",
    borderColor: "#b0396b",
  },
  tabText: {
    color: "#333",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },

  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  text: {
    color: "#444",
  },
});

