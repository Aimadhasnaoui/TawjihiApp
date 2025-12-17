import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GetEtudientChoix } from "../../services/User";
import { useAuth } from "../context/AuthContext";
export default function Suivi() {
  const [activeTab, setActiveTab] = useState("choisi");
  const { user } = useAuth();
  const TABS = [
    { key: "choisi", label: "Choisi" },
    { key: "inscrit", label: "Inscrit" },
    { key: "accepte", label: "Accepté" },
    { key: "refuse", label: "Refusé" },
    { key: "liste_attente", label: "Liste d’attente" },
  ];
  // Fetch data using useQuery
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["etudiantChoix", user?.user?.id],
    queryFn: () => GetEtudientChoix(user?.user?.id),
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    retry: 2,
  });

  // Filter data based on active tab
  const filteredData = data.filter((item) => item.statut_ecole === activeTab);

  // Get count for each tab
  const getTabCount = (status) => {
    return data.filter((item) => item.statut_ecole === status).length;
  };
  return (
    <ScrollView>
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
      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#b0396b" />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : isError ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>
              Erreur: {error?.message || "Une erreur est survenue"}
            </Text>
            <Pressable onPress={() => refetch()} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </Pressable>
          </View>
        ) : filteredData.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              Aucun établissement{" "}
              {TABS.find((t) => t.key === activeTab)?.label.toLowerCase()}
            </Text>
          </View>
        ) : (
          filteredData.map((item) => (
            <View key={item._id} style={styles.card}>
              {/* School Info */}
              <View style={styles.cardHeader}>
                <Text style={styles.schoolName}>{item.ecole.nameFr}</Text>
                <View style={styles.orderBadge}>
                  <Text style={styles.orderText}>Choix {item.ordre_ecole}</Text>
                </View>
              </View>

              <Text style={styles.schoolNameAr}>{item.ecole.nameAr}</Text>
              <Text style={styles.address}>{item.ecole.adresseFr}</Text>

              {/* Filieres */}
              <View style={styles.filieresSection}>
                <Text style={styles.sectionTitle}>Filières choisies:</Text>
                {item.filieres.map((filiere) => (
                  <View key={filiere._id} style={styles.filiereItem}>
                    <View style={styles.filiereBadge}>
                      <Text style={styles.filiereBadgeText}>
                        {filiere.ordre_fillier}
                      </Text>
                    </View>
                    <View style={styles.filiereInfo}>
                      <Text style={styles.filiereName}>
                        {filiere.fillier.nameFR}
                      </Text>
                      <Text style={styles.filiereNameAr}>
                        {filiere.fillier.nameAr}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Dates */}
              <View style={styles.datesSection}>
                <Text style={styles.dateText}>
                  📅 Inscription:{" "}
                  {new Date(item.ecole.dateInscreption).toLocaleDateString(
                    "fr-FR"
                  )}
                </Text>
                <Text style={styles.dateText}>
                  🔚 Fin:{" "}
                  {new Date(item.ecole.dateFinInscreption).toLocaleDateString(
                    "fr-FR"
                  )}
                </Text>
              </View>

              {/* Status Badge
              <View
                style={[
                  styles.statusBadge,
                  styles[`status_${item.statut_ecole}`],
                ]}
              >
                <Text style={styles.statusText}>
                  {TABS.find((t) => t.key === item.statut_ecole)?.label ||
                    item.statut_ecole}
                </Text>
              </View> */}
            </View>
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   Gardient: {
//     padding: 20,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   header: {
//     backgroundColor: "#b0396b",
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//   },
//   headerTitle: {
//     color: "white",
//     fontSize: 28,
//     fontWeight: "bold",
//   },
//   headerSubtitle: {
//     color: "rgba(255,255,255,0.8)",
//     marginTop: 6,
//   },

//   tabsRow: {
//     paddingHorizontal: 16,
//     paddingTop: 14,
//     paddingBottom: 8,
//     gap: 10,
//     alignItems: "center",
//   },
//   tab: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#e7e7e7",
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   tabActive: {
//     backgroundColor: "#b0396b",
//     borderColor: "#b0396b",
//   },
//   tabText: {
//     color: "#333",
//     fontWeight: "600",
//   },
//   tabTextActive: {
//     color: "#fff",
//   },

//   content: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 6,
//   },
//   text: {
//     color: "#444",
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  Gardient: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tabsRow: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 10,
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#e7e7e7",
    backgroundColor: "#fff",
    alignItems: "center",
    minWidth: 100,
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
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#b0396b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    flex: 1,
  },
  orderBadge: {
    backgroundColor: "#b0396b",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  schoolNameAr: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
    textAlign: "right",
  },
  address: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  filieresSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  filiereItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  filiereBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#b0396b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  filiereBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  filiereInfo: {
    flex: 1,
  },
  filiereName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  filiereNameAr: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  datesSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  dateText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  statusBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  status_choisi: {
    backgroundColor: "#2196F3",
  },
  status_inscrit: {
    backgroundColor: "#FF9800",
  },
  status_accepte: {
    backgroundColor: "#4CAF50",
  },
  status_refuse: {
    backgroundColor: "#F44336",
  },
  status_liste_attente: {
    backgroundColor: "#9C27B0",
  },
});
