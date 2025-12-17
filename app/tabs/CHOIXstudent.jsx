import { useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronRight,
  GraduationCap,
  MapPin,
  X,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GetEcoles,
  GetEcolesFillier,
  PushChoixEtudient,
} from "../../services/Ecole";
import { useAuth } from "../context/AuthContext";
export default function CHOIXstudent() {
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [selectedFilieres, setSelectedFilieres] = useState([]);
  const { user } = useAuth();
  // Fetch all schools
  const { data: schools = [], isLoading: loadingSchools } = useQuery({
    queryKey: ["ecoles"],
    queryFn: GetEcoles,
  });

  // Fetch filieres for current school
  const { data: schoolData, isLoading: loadingFilieres } = useQuery({
    queryKey: ["ecole-filieres", currentSchool?._id],
    queryFn: () => GetEcolesFillier(currentSchool._id),
    enabled: !!currentSchool,
  });

  const handleSchoolPress = (school) => {
    // Check if school is already selected
    const existingSchool = selectedSchools.find(
      (s) => s.ecole._id === school._id
    );

    if (existingSchool) {
      // Edit existing selection
      setCurrentSchool(school);
      setSelectedFilieres(existingSchool.filieres);
      setModalVisible(true);
    } else {
      // New selection
      setCurrentSchool(school);
      setSelectedFilieres([]);
      setModalVisible(true);
    }
  };

  const handleFiliereToggle = (filiere) => {
    const isSelected = selectedFilieres.some(
      (f) => f.fillier._id === filiere._id
    );

    if (isSelected) {
      // Remove filiere
      setSelectedFilieres(
        selectedFilieres.filter((f) => f.fillier._id !== filiere._id)
      );
    } else {
      // Add filiere with order
      const newFiliere = {
        fillier: filiere,
        ordre_fillier: selectedFilieres.length + 1,
      };
      setSelectedFilieres([...selectedFilieres, newFiliere]);
    }
  };

  const handleSaveChoice = () => {
    if (selectedFilieres.length === 0) {
      alert("Veuillez sélectionner au moins une filière");
      return;
    }

    const existingIndex = selectedSchools.findIndex(
      (s) => s.ecole._id === currentSchool._id
    );

    const newChoice = {
      ecole: currentSchool,
      ordre_ecole:
        existingIndex >= 0 ? existingIndex + 1 : selectedSchools.length + 1,
      statut_ecole: "choisi",
      filieres: selectedFilieres,
    };

    if (existingIndex >= 0) {
      // Update existing
      const updated = [...selectedSchools];
      updated[existingIndex] = newChoice;
      setSelectedSchools(updated);
    } else {
      // Add new
      setSelectedSchools([...selectedSchools, newChoice]);
    }

    setModalVisible(false);
    setCurrentSchool(null);
    setSelectedFilieres([]);
  };

  const handleRemoveSchool = (schoolId) => {
    const updated = selectedSchools
      .filter((s) => s.ecole._id !== schoolId)
      .map((s, index) => ({ ...s, ordre_ecole: index + 1 }));
    setSelectedSchools(updated);
  };

  const handleSubmit = () => {
    // Prepare data for API
    const choixData = selectedSchools.map((choice) => ({
      etudiant: user?.user?.id,
      ecole: choice.ecole._id,
      ordre_ecole: choice.ordre_ecole,
      statut_ecole: choice.statut_ecole,
      filieres: choice.filieres.map((f) => ({
        fillier: f.fillier._id,
        ordre_fillier: f.ordre_fillier,
      })),
    }));

    console.log("Choix à envoyer:", choixData);
    console.log("Choix à envoyer:", choixData.filieres);
    PushChoixEtudient(choixData)
      .then((res) => {
        console.log(res);
        alert("Choix enregistré avec succès");
      })
      .catch((error) => {
        console.log("Full Error:", error);
        console.log("Error Response Data:", error.response?.data);
        const backendMessage =
          error.response?.data?.message ||
          "Erreur lors de l'enregistrement des choix";
        alert(backendMessage);
      });
    // TODO: Call API to save choices
  };

  const isSchoolSelected = (schoolId) => {
    return selectedSchools.some((s) => s.ecole._id === schoolId);
  };

  if (loadingSchools) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b0396b" />
        <Text style={styles.loadingText}>Chargement des écoles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        className="bg-[#b0396b] pt-2 pb-6 px-6 shadow-lg"
        style={styles.gradient}
      >
        <Text className="text-white text-3xl font-bold">Mes Choix</Text>
        <Text className="text-white/80 text-sm mt-1">
          Sélectionnez vos établissements et filières préférés
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Selected Schools Summary */}
        {selectedSchools.length > 0 && (
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>
              Mes choix ({selectedSchools.length})
            </Text>
            {selectedSchools.map((choice, index) => (
              <View key={choice.ecole._id} style={styles.selectedCard}>
                <View style={styles.selectedHeader}>
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderText}>{index + 1}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.selectedSchoolName}>
                      {choice.ecole.nameFr}
                    </Text>
                    <Text style={styles.selectedSchoolNameAr}>
                      {choice.ecole.nameAr}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleRemoveSchool(choice.ecole._id)}
                    style={styles.removeButton}
                  >
                    <X color="#fff" size={16} />
                  </Pressable>
                </View>
                <View style={styles.filieresPreview}>
                  {choice.filieres.map((f) => (
                    <View key={f.fillier._id} style={styles.filiereTag}>
                      <Text style={styles.filiereTagText}>
                        {f.ordre_fillier}. {f.fillier.nameFR}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Check color="#fff" size={20} />
              <Text style={styles.submitButtonText}>Valider mes choix</Text>
            </Pressable>
          </View>
        )}

        {/* Available Schools */}
        <Text style={styles.sectionTitle}>Établissements disponibles</Text>
        {schools.map((school) => (
          <Pressable
            key={school._id}
            style={[
              styles.schoolCard,
              isSchoolSelected(school._id) && styles.schoolCardSelected,
            ]}
            onPress={() => handleSchoolPress(school)}
          >
            <View style={styles.schoolCardHeader}>
              <GraduationCap
                color={isSchoolSelected(school._id) ? "#b0396b" : "#666"}
                size={24}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.schoolName}>{school.nameFr}</Text>
                <Text style={styles.schoolNameAr}>{school.nameAr}</Text>
              </View>
              {isSchoolSelected(school._id) && (
                <View style={styles.checkBadge}>
                  <Check color="#fff" size={16} />
                </View>
              )}
            </View>
            <View style={styles.schoolInfo}>
              <MapPin color="#888" size={14} />
              <Text style={styles.schoolAddress}>{school.adresseFr}</Text>
            </View>
            <View style={styles.schoolFooter}>
              <Text style={styles.infoText}>
                📚 {school.Nobrechoix} choix disponibles
              </Text>
              <ChevronRight color="#b0396b" size={20} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Filiere Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Choisir les filières</Text>
                <Text style={styles.modalSubtitle}>
                  {currentSchool?.nameFr}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <X color="#666" size={24} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll}>
              {loadingFilieres ? (
                <ActivityIndicator size="large" color="#b0396b" />
              ) : (
                schoolData?.ListFillier.map((filiere) => {
                  const isSelected = selectedFilieres.some(
                    (f) => f.fillier._id === filiere._id
                  );
                  const selectedFiliere = selectedFilieres.find(
                    (f) => f.fillier._id === filiere._id
                  );

                  return (
                    <Pressable
                      key={filiere._id}
                      style={[
                        styles.filiereOption,
                        isSelected && styles.filiereOptionSelected,
                      ]}
                      onPress={() => handleFiliereToggle(filiere)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.filiereName}>{filiere.nameFR}</Text>
                        <Text style={styles.filiereNameAr}>
                          {filiere.nameAr}
                        </Text>
                      </View>
                      {isSelected && (
                        <View style={styles.orderIndicator}>
                          <Text style={styles.orderIndicatorText}>
                            {selectedFiliere?.ordre_fillier}
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Text style={styles.selectedCount}>
                {selectedFilieres.length} filière(s) sélectionnée(s)
              </Text>
              <Pressable style={styles.saveButton} onPress={handleSaveChoice}>
                <Check color="#fff" size={20} />
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  gradient: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    marginTop: 8,
  },
  summarySection: {
    marginBottom: 24,
  },
  selectedCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#b0396b",
  },
  selectedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#b0396b",
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  selectedSchoolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  selectedSchoolNameAr: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  removeButton: {
    backgroundColor: "#F44336",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  filieresPreview: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filiereTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  filiereTagText: {
    fontSize: 12,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  schoolCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolCardSelected: {
    borderWidth: 2,
    borderColor: "#b0396b",
  },
  schoolCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  schoolNameAr: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  checkBadge: {
    backgroundColor: "#b0396b",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  schoolInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  schoolAddress: {
    fontSize: 13,
    color: "#888",
  },
  schoolFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  modalScroll: {
    padding: 20,
  },
  filiereOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  filiereOptionSelected: {
    backgroundColor: "#fff",
    borderColor: "#b0396b",
  },
  filiereName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  filiereNameAr: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginTop: 4,
  },
  orderIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#b0396b",
    justifyContent: "center",
    alignItems: "center",
  },
  orderIndicatorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  selectedCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#b0396b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
