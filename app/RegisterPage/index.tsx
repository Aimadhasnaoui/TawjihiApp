"use client"

import { useState } from "react"
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ProgressStep, ProgressSteps } from "react-native-progress-steps"

// Define colors
const COLORS = {
  primary: "#b0396b",
  secondary: "#58277f",
  success: "#73AF6F",
  inputBg: "#f8f0f4",
  white: "#ffffff",
  gray: "#666666",
  lightGray: "#e0e0e0",
}

// Types
interface ContactInfo {
  adresse_fr: string
  adresse_ar: string
  ville: string
  email: string
  telephone: string
}

interface TuteurInfo {
  type_tuteur: string
  prenom_pere: string
  nom_pere: string
  cin_pere: string
  prenom_mere: string
  nom_mere: string
  cin_mere: string
}

interface ScolaireInfo {
  code_massar: string
  option_bac: string
  nom_lycee: string
  type_lycee: string
}

interface NotesInfo {
  note_regionale: string
  moyenne_1ere: string
  moyenne_2eme: string
  note_nationale: string
}

const StudentRegistrationForm = () => {
  // Step 1: Contact Info
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    adresse_fr: "",
    adresse_ar: "",
    ville: "",
    email: "",
    telephone: "",
  })

  // Step 2: Tuteur Info
  const [tuteurInfo, setTuteurInfo] = useState<TuteurInfo>({
    type_tuteur: "",
    prenom_pere: "",
    nom_pere: "",
    cin_pere: "",
    prenom_mere: "",
    nom_mere: "",
    cin_mere: "",
  })

  // Step 3: Scolaire Info
  const [scolaireInfo, setScolaireInfo] = useState<ScolaireInfo>({
    code_massar: "",
    option_bac: "",
    nom_lycee: "",
    type_lycee: "",
  })

  // Step 4: Notes Info
  const [notesInfo, setNotesInfo] = useState<NotesInfo>({
    note_regionale: "",
    moyenne_1ere: "",
    moyenne_2eme: "",
    note_nationale: "",
  })

  // Step 5: Image
  const [imageUri, setImageUri] = useState<string | null>(null)

  // Tuteur type options
  const tuteurTypes = ["Père", "Mère", "Tuteur légal", "Autre"]
  const [selectedTuteur, setSelectedTuteur] = useState<string>("")

  // Lycee type options
  const lyceeTypes = ["Public", "Privé"]
  const [selectedLyceeType, setSelectedLyceeType] = useState<string>("")

  // Handle image pick (placeholder - integrate with expo-image-picker)
  const handlePickImage = () => {
    // In real app, use expo-image-picker or react-native-image-picker
    Alert.alert("Sélectionner une image", "Intégrez expo-image-picker pour cette fonctionnalité")
  }

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      infos_contact: contactInfo,
      infos_tuteur: tuteurInfo,
      infos_scolaires: scolaireInfo,
      notes: notesInfo,
      image: imageUri,
    }
    console.log("Form submitted:", formData)
    Alert.alert("Succès", "Inscription complétée avec succès!")
  }

  // Custom input component
  const FormInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    isArabic = false,
  }: {
    label: string
    value: string
    onChangeText: (text: string) => void
    placeholder: string
    keyboardType?: any
    secureTextEntry?: boolean
    isArabic?: boolean
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isArabic && styles.arabicInput]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        textAlign={isArabic ? "right" : "left"}
      />
    </View>
  )

  // Option selector component
  const OptionSelector = ({
    label,
    options,
    selected,
    onSelect,
  }: {
    label: string
    options: string[]
    selected: string
    onSelect: (option: string) => void
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, selected === option && styles.optionButtonSelected]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.optionText, selected === option && styles.optionTextSelected]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  // Section header component
  const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inscription Étudiant</Text>
        <Text style={styles.headerSubtitle}>Complétez vos informations en 5 étapes</Text>
      </View>

      <ProgressSteps
        completedLabelColor={COLORS.success}
        activeLabelColor={COLORS.secondary}
        labelColor={COLORS.gray}
        completedStepIconColor={COLORS.success}
        activeStepNumColor={COLORS.white}
        progressBarColor={COLORS.lightGray}
        completedProgressBarColor={COLORS.success}
        activeStepIconBorderColor={COLORS.primary}
        activeStepIconColor={COLORS.primary}
        disabledStepIconColor={COLORS.lightGray}
        labelFontSize={11}
        topOffset={15}
        marginBottom={30}
      >
        {/* Step 1: Contact Info */}
        <ProgressStep
          label="Contact"
              buttonFillColor="#2D2D2D"
            buttonNextTextColor="#b0396b"
          buttonNextText="Suivant"
        >
          <ScrollView style={styles.stepContent}>
            <SectionHeader title="Informations de Contact" />

            <FormInput
              label="Adresse (Français)"
              value={contactInfo.adresse_fr}
              onChangeText={(text) => setContactInfo({ ...contactInfo, adresse_fr: text })}
              placeholder="Entrez votre adresse"
            />

            <FormInput
              label="العنوان (بالعربية)"
              value={contactInfo.adresse_ar}
              onChangeText={(text) => setContactInfo({ ...contactInfo, adresse_ar: text })}
              placeholder="أدخل عنوانك"
              isArabic
            />

            <FormInput
              label="Ville"
              value={contactInfo.ville}
              onChangeText={(text) => setContactInfo({ ...contactInfo, ville: text })}
              placeholder="Entrez votre ville"
            />

            <FormInput
              label="Email"
              value={contactInfo.email}
              onChangeText={(text) => setContactInfo({ ...contactInfo, email: text })}
              placeholder="exemple@email.com"
              keyboardType="email-address"
            />

            <FormInput
              label="Téléphone"
              value={contactInfo.telephone}
              onChangeText={(text) => setContactInfo({ ...contactInfo, telephone: text })}
              placeholder="06XXXXXXXX"
              keyboardType="phone-pad"
            />
          </ScrollView>
        </ProgressStep>

        {/* Step 2: Tuteur Info */}
        <ProgressStep
          label="Tuteur"
         buttonNextTextColor="#b0396b"
          buttonNextText="Suivant"
          buttonPreviousText="Retour"
        >
          <ScrollView style={styles.stepContent}>
            <SectionHeader title="Informations du Tuteur" />

            <OptionSelector
              label="Type de Tuteur"
              options={tuteurTypes}
              selected={selectedTuteur}
              onSelect={(option) => {
                setSelectedTuteur(option)
                setTuteurInfo({ ...tuteurInfo, type_tuteur: option })
              }}
            />

            <SectionHeader title="Informations du Père" />

            <FormInput
              label="Prénom du Père"
              value={tuteurInfo.prenom_pere}
              onChangeText={(text) => setTuteurInfo({ ...tuteurInfo, prenom_pere: text })}
              placeholder="Prénom"
            />

            <FormInput
              label="Nom du Père"
              value={tuteurInfo.nom_pere}
              onChangeText={(text) => setTuteurInfo({ ...tuteurInfo, nom_pere: text })}
              placeholder="Nom"
            />

            <FormInput
              label="CIN du Père"
              value={tuteurInfo.cin_pere}
              onChangeText={(text) => setTuteurInfo({ ...tuteurInfo, cin_pere: text })}
              placeholder="Ex: AB123456"
            />

            <SectionHeader title="Informations de la Mère" />

            <FormInput
              label="Prénom de la Mère"
              value={tuteurInfo.prenom_mere}
              onChangeText={(text) => setTuteurInfo({ ...tuteurInfo, prenom_mere: text })}
              placeholder="Prénom"
            />

            <FormInput
              label="Nom de la Mère"
              value={tuteurInfo.nom_mere}
              onChangeText={(text) => setTuteurInfo({ ...tuteurInfo, nom_mere: text })}
              placeholder="Nom"
            />

            <FormInput
              label="CIN de la Mère"
              value={tuteurInfo.cin_mere}
              onChangeText={(text) => setTuteurInfo({ ...tuteurInfo, cin_mere: text })}
              placeholder="Ex: AB123456"
            />
          </ScrollView>
        </ProgressStep>

        {/* Step 3: Scolaire Info */}
        <ProgressStep
          label="Scolaire"
          buttonNextTextColor="#b0396b"
          buttonNextText="Suivant"
          buttonPreviousText="Retour"
        >
          <ScrollView style={styles.stepContent}>
            <SectionHeader title="Informations Scolaires" />

            <FormInput
              label="Code Massar"
              value={scolaireInfo.code_massar}
              onChangeText={(text) => setScolaireInfo({ ...scolaireInfo, code_massar: text })}
              placeholder="Entrez votre code Massar"
            />

            <FormInput
              label="Option Bac"
              value={scolaireInfo.option_bac}
              onChangeText={(text) => setScolaireInfo({ ...scolaireInfo, option_bac: text })}
              placeholder="Ex: Sciences Mathématiques"
            />

            <FormInput
              label="Nom du Lycée"
              value={scolaireInfo.nom_lycee}
              onChangeText={(text) => setScolaireInfo({ ...scolaireInfo, nom_lycee: text })}
              placeholder="Nom de votre lycée"
            />

            <OptionSelector
              label="Type de Lycée"
              options={lyceeTypes}
              selected={selectedLyceeType}
              onSelect={(option) => {
                setSelectedLyceeType(option)
                setScolaireInfo({ ...scolaireInfo, type_lycee: option })
              }}
            />
          </ScrollView>
        </ProgressStep>

        {/* Step 4: Notes Info */}
        <ProgressStep
          label="Notes"
         buttonNextTextColor="#b0396b"
          buttonNextText="Suivant"
          buttonPreviousText="Retour"
        >
          <ScrollView style={styles.stepContent}>
            <SectionHeader title="Notes et Moyennes" />

            <View style={styles.notesGrid}>
              <View style={styles.noteItem}>
                <Text style={styles.noteLabel}>Note Régionale</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="--/20"
                  placeholderTextColor="#999"
                  value={notesInfo.note_regionale}
                  onChangeText={(text) => setNotesInfo({ ...notesInfo, note_regionale: text })}
                  keyboardType="decimal-pad"
                  textAlign="center"
                />
              </View>

              <View style={styles.noteItem}>
                <Text style={styles.noteLabel}>Note Nationale</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="--/20"
                  placeholderTextColor="#999"
                  value={notesInfo.note_nationale}
                  onChangeText={(text) => setNotesInfo({ ...notesInfo, note_nationale: text })}
                  keyboardType="decimal-pad"
                  textAlign="center"
                />
              </View>
            </View>

            <SectionHeader title="Moyennes Annuelles" />

            <View style={styles.notesGrid}>
              <View style={styles.noteItem}>
                <Text style={styles.noteLabel}>1ère Année Bac</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="--/20"
                  placeholderTextColor="#999"
                  value={notesInfo.moyenne_1ere}
                  onChangeText={(text) => setNotesInfo({ ...notesInfo, moyenne_1ere: text })}
                  keyboardType="decimal-pad"
                  textAlign="center"
                />
              </View>

              <View style={styles.noteItem}>
                <Text style={styles.noteLabel}>2ème Année Bac</Text>
                <TextInput
                  style={styles.noteInput}
                  placeholder="--/20"
                  placeholderTextColor="#999"
                  value={notesInfo.moyenne_2eme}
                  onChangeText={(text) => setNotesInfo({ ...notesInfo, moyenne_2eme: text })}
                  keyboardType="decimal-pad"
                  textAlign="center"
                />
              </View>
            </View>
          </ScrollView>
        </ProgressStep>

        {/* Step 5: Image Upload */}
        <ProgressStep
          label="Photo"
          buttonFinishText="Terminer"
          onSubmit={handleSubmit}
          // nextBtnStyle={styles.submitButton}
          // nextBtnTextStyle={styles.buttonText}
          // previousBtnStyle={styles.prevButton}
          // previousBtnTextStyle={styles.prevButtonText}
          buttonPreviousText="Retour"
        >
          <ScrollView style={styles.stepContent}>
            <SectionHeader title="Photo de Profil" />

            <View style={styles.imageUploadContainer}>
              <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.previewImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <View style={styles.cameraIcon}>
                      <View style={styles.cameraBody} />
                      <View style={styles.cameraLens} />
                    </View>
                    <Text style={styles.uploadText}>Appuyez pour ajouter une photo</Text>
                    <Text style={styles.uploadSubtext}>Format: JPG, PNG (max 5MB)</Text>
                  </View>
                )}
              </TouchableOpacity>

              {imageUri && (
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setImageUri(null)}>
                  <Text style={styles.removeImageText}>Supprimer la photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Conseils pour votre photo</Text>
              <Text style={styles.infoText}>• Utilisez une photo récente et claire</Text>
              <Text style={styles.infoText}>• Fond neutre de préférence</Text>
              <Text style={styles.infoText}>• Visage bien visible et centré</Text>
            </View>
          </ScrollView>
        </ProgressStep>
      </ProgressSteps>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginTop: 5,
  },
  stepContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
    marginHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.gray,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  arabicInput: {
    textAlign: "right",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  optionTextSelected: {
    color: COLORS.white,
    fontWeight: "600",
  },
  notesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  noteItem: {
    flex: 1,
    alignItems: "center",
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.gray,
    marginBottom: 8,
    textAlign: "center",
  },
  noteInput: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  imageUploadContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  imagePickerButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: COLORS.inputBg,
    borderWidth: 3,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 50,
    height: 40,
    marginBottom: 10,
  },
  cameraBody: {
    width: 50,
    height: 35,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    position: "absolute",
    bottom: 0,
  },
  cameraLens: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: "absolute",
    bottom: 7,
    left: 15,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
    textAlign: "center",
  },
  uploadSubtext: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 5,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  removeImageText: {
    color: "#e74c3c",
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: "#f0e6f3",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 4,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  prevButton: {
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  prevButtonText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: COLORS.success,
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
})

export default StudentRegistrationForm
