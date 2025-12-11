// import React, { useState } from "react";
// import { StyleSheet, Text, TextInput, View } from "react-native";
// import { ProgressStep, ProgressSteps } from "react-native-progress-steps";

// const ProgressStepsComponent = () => {
//   const [step1Data, setStep1Data] = useState({ name: "", address: "" });
//   const [step2Data, setStep2Data] = useState({ email: "", username: "" });
//   const [step3Data, setStep3Data] = useState({
//     password: "",
//     retypePassword: "",
//   });

//   return (
//     <View style={styles.container}>
//       <ProgressSteps
//         completedLabelColor="#73AF6F"
//         activeLabelColor="#58277f"
//         labelColor="#58277f"
//         completedStepIconColor="#73AF6F"
//         activeStepNumColor="#b0396b"
//         progressBarColor="#58277f"
//         activeStepIconBorderColor="#58277f"
//         activeStepIconColor="#58277f"
//       >
//         <ProgressStep
//           label="Step 1"
//           buttonFillColor="#2D2D2D"
//           buttonNextTextColor="#FFFFFF"
//         >
//           <View>
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               value={step1Data.name}
//               onChangeText={(text) =>
//                 setStep1Data({ ...step1Data, name: text })
//               }
//             />
//             <Text style={styles.label}>Address</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Address"
//               value={step1Data.address}
//               onChangeText={(text) =>
//                 setStep1Data({ ...step1Data, address: text })
//               }
//             />
//           </View>
//         </ProgressStep>
//         <ProgressStep label="Step 2">
//           <View>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={step2Data.email}
//               onChangeText={(text) =>
//                 setStep2Data({ ...step2Data, email: text })
//               }
//             />
//             <Text style={styles.label}>Username</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Username"
//               value={step2Data.username}
//               onChangeText={(text) =>
//                 setStep2Data({ ...step2Data, username: text })
//               }
//             />
//           </View>
//         </ProgressStep>
//         <ProgressStep label="Step 3">
//           <View>
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               secureTextEntry={true}
//               value={step3Data.password}
//               onChangeText={(text) =>
//                 setStep3Data({ ...step3Data, password: text })
//               }
//             />
//             <Text style={styles.label}>Retype Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Retype Password"
//               secureTextEntry={true}
//               value={step3Data.retypePassword}
//               onChangeText={(text) =>
//                 setStep3Data({ ...step3Data, retypePassword: text })
//               }
//             />
//           </View>
//         </ProgressStep>
//       </ProgressSteps>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#b0396b",
//   },
//   label: {
//     fontSize: 16,
//     marginHorizontal: 5,
//     marginTop: 10,
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#e8f5e9",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     marginTop: 10,
//   },
// });

// export default ProgressStepsComponent;
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";

const EtudiantRegisterSteps = () => {
  const [contact, setContact] = useState({
    adresse_fr: "",
    adresse_ar: "",
    ville_residence: "",
    email: "",
    email_code: "",
    tel_eleve: "",
  });

  const [tuteur, setTuteur] = useState({
    type_tuteur: "",
    tel_tuteur: "",
    prenom_pere_fr: "",
    nom_pere_fr: "",
    prenom_pere_ar: "",
    nom_pere_ar: "",
    cin_pere: "",
    prenom_mere_fr: "",
    nom_mere_fr: "",
    prenom_mere_ar: "",
    nom_mere_ar: "",
    cin_mere: "",
  });

  const [scolaire, setScolaire] = useState({
    massar_id: "",
    massar_code: "",
    option_bac: "",
    lycee_nom: "",
    lycee_type: "", // public / privé
  });

  const [notes, setNotes] = useState({
    note_examen_regional: "",
    note_francais_regional: "",
    note_arabe_regional: "",
    moyenne_1ere_annee: "",
    note_s1_2eme_annee: "",
    note_s2_2eme_annee: "",
    note_examen_national: "",
    note_maths_national: "",
    note_physique_national: "",
    note_svt_national: "",
    note_anglais_national: "",
    moyenne_generale_bac: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    const payload = {
      contact,
      tuteur,
      scolaire,
      notes: {
        ...notes,
        // convert numeric strings to numbers if needed before sending to API
      },
      Image: imageUrl || null,
    };

    console.log("🚀 Final student payload:", payload);
    // TODO: send to your API here (axios / fetch)
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Compléter votre inscription</Text>
        <Text style={styles.subtitle}>
          Veuillez remplir les informations étape par étape.
        </Text>

        <ProgressSteps
          completedLabelColor="#73AF6F"
          activeLabelColor="#58277f"
          labelColor="#58277f"
          completedStepIconColor="#73AF6F"
          activeStepNumColor="#b0396b"
          progressBarColor="#58277f"
          activeStepIconBorderColor="#58277f"
          activeStepIconColor="#b0396b"
        >
          {/* STEP 1 – CONTACT */}
          <ProgressStep
            label="Contact"
            // nextBtnText="Suivant"
            // previousBtnText=""
            removeBtnRow={false}
          >
            <ScrollView contentContainerStyle={styles.stepContent}>
              <Text style={styles.sectionLabel}>Adresse</Text>

              <Text style={styles.label}>Adresse (français)</Text>
              <TextInput
                style={styles.input}
                placeholder="Adresse en français"
                value={contact.adresse_fr}
                onChangeText={(text) =>
                  setContact({ ...contact, adresse_fr: text })
                }
              />

              <Text style={styles.label}>Adresse (arabe)</Text>
              <TextInput
                style={styles.input}
                placeholder="العنوان"
                value={contact.adresse_ar}
                onChangeText={(text) =>
                  setContact({ ...contact, adresse_ar: text })
                }
              />

              <Text style={styles.label}>Ville de résidence</Text>
              <TextInput
                style={styles.input}
                placeholder="Agadir, Casablanca..."
                value={contact.ville_residence}
                onChangeText={(text) =>
                  setContact({ ...contact, ville_residence: text })
                }
              />

              <Text style={styles.sectionLabel}>Contact</Text>

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                keyboardType="email-address"
                value={contact.email}
                onChangeText={(text) =>
                  setContact({ ...contact, email: text })
                }
              />

              <Text style={styles.label}>Code email (vérification)</Text>
              <TextInput
                style={styles.input}
                placeholder="Code envoyé par email"
                value={contact.email_code}
                onChangeText={(text) =>
                  setContact({ ...contact, email_code: text })
                }
              />

              <Text style={styles.label}>Téléphone élève</Text>
              <TextInput
                style={styles.input}
                placeholder="06 XX XX XX XX"
                keyboardType="phone-pad"
                value={contact.tel_eleve}
                onChangeText={(text) =>
                  setContact({ ...contact, tel_eleve: text })
                }
              />
            </ScrollView>
          </ProgressStep>

          {/* STEP 2 – TUTEUR */}
          <ProgressStep
            label="Tuteur"
            // nextBtnText="Suivant"
            // previousBtnText="Précédent"
          >
            <ScrollView contentContainerStyle={styles.stepContent}>
              <Text style={styles.sectionLabel}>Tuteur</Text>

              <Text style={styles.label}>Type de tuteur</Text>
              <TextInput
                style={styles.input}
                placeholder="père / mère / autre"
                value={tuteur.type_tuteur}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, type_tuteur: text })
                }
              />

              <Text style={styles.label}>Téléphone tuteur</Text>
              <TextInput
                style={styles.input}
                placeholder="06 XX XX XX XX"
                keyboardType="phone-pad"
                value={tuteur.tel_tuteur}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, tel_tuteur: text })
                }
              />

              <Text style={styles.sectionLabel}>Père</Text>

              <Text style={styles.label}>Prénom père (français)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.prenom_pere_fr}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, prenom_pere_fr: text })
                }
              />

              <Text style={styles.label}>Nom père (français)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.nom_pere_fr}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, nom_pere_fr: text })
                }
              />

              <Text style={styles.label}>Prénom père (arabe)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.prenom_pere_ar}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, prenom_pere_ar: text })
                }
              />

              <Text style={styles.label}>Nom père (arabe)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.nom_pere_ar}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, nom_pere_ar: text })
                }
              />

              <Text style={styles.label}>CIN père</Text>
              <TextInput
                style={styles.input}
                value={tuteur.cin_pere}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, cin_pere: text })
                }
              />

              <Text style={styles.sectionLabel}>Mère</Text>

              <Text style={styles.label}>Prénom mère (français)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.prenom_mere_fr}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, prenom_mere_fr: text })
                }
              />

              <Text style={styles.label}>Nom mère (français)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.nom_mere_fr}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, nom_mere_fr: text })
                }
              />

              <Text style={styles.label}>Prénom mère (arabe)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.prenom_mere_ar}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, prenom_mere_ar: text })
                }
              />

              <Text style={styles.label}>Nom mère (arabe)</Text>
              <TextInput
                style={styles.input}
                value={tuteur.nom_mere_ar}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, nom_mere_ar: text })
                }
              />

              <Text style={styles.label}>CIN mère</Text>
              <TextInput
                style={styles.input}
                value={tuteur.cin_mere}
                onChangeText={(text) =>
                  setTuteur({ ...tuteur, cin_mere: text })
                }
              />
            </ScrollView>
          </ProgressStep>

          {/* STEP 3 – SCOLAIRE */}
          <ProgressStep
            label="Scolaire"
            // nextBtnText="Suivant"
            // previousBtnText="Précédent"
          >
            <ScrollView contentContainerStyle={styles.stepContent}>
              <Text style={styles.sectionLabel}>Massar</Text>

              <Text style={styles.label}>Massar ID</Text>
              <TextInput
                style={styles.input}
                value={scolaire.massar_id}
                onChangeText={(text) =>
                  setScolaire({ ...scolaire, massar_id: text })
                }
              />

              <Text style={styles.label}>Code Massar</Text>
              <TextInput
                style={styles.input}
                value={scolaire.massar_code}
                onChangeText={(text) =>
                  setScolaire({ ...scolaire, massar_code: text })
                }
              />

              <Text style={styles.sectionLabel}>Baccalauréat</Text>

              <Text style={styles.label}>Option du bac</Text>
              <TextInput
                style={styles.input}
                placeholder="PC, SVT, SMA, ECO..."
                value={scolaire.option_bac}
                onChangeText={(text) =>
                  setScolaire({ ...scolaire, option_bac: text })
                }
              />

              <Text style={styles.label}>Lycée</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom du lycée"
                value={scolaire.lycee_nom}
                onChangeText={(text) =>
                  setScolaire({ ...scolaire, lycee_nom: text })
                }
              />

              <Text style={styles.label}>Type de lycée</Text>
              <TextInput
                style={styles.input}
                placeholder="public / privé"
                value={scolaire.lycee_type}
                onChangeText={(text) =>
                  setScolaire({ ...scolaire, lycee_type: text })
                }
              />
            </ScrollView>
          </ProgressStep>

          {/* STEP 4 – NOTES */}
          <ProgressStep
            label="Notes"
            // nextBtnText="Suivant"
            // previousBtnText="Précédent"
          >
            <ScrollView contentContainerStyle={styles.stepContent}>
              <Text style={styles.sectionLabel}>Examen régional</Text>

              <Text style={styles.label}>Note examen régional</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_examen_regional}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_examen_regional: text })
                }
              />

              <Text style={styles.label}>Note français régional</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_francais_regional}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_francais_regional: text })
                }
              />

              <Text style={styles.label}>Note arabe régional</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_arabe_regional}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_arabe_regional: text })
                }
              />

              <Text style={styles.sectionLabel}>1ère et 2ème année</Text>

              <Text style={styles.label}>Moyenne 1ère année</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.moyenne_1ere_annee}
                onChangeText={(text) =>
                  setNotes({ ...notes, moyenne_1ere_annee: text })
                }
              />

              <Text style={styles.label}>Note S1 (2ème année)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_s1_2eme_annee}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_s1_2eme_annee: text })
                }
              />

              <Text style={styles.label}>Note S2 (2ème année)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_s2_2eme_annee}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_s2_2eme_annee: text })
                }
              />

              <Text style={styles.sectionLabel}>Examen national</Text>

              <Text style={styles.label}>Note examen national</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_examen_national}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_examen_national: text })
                }
              />

              <Text style={styles.label}>Note maths</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_maths_national}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_maths_national: text })
                }
              />

              <Text style={styles.label}>Note physique</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_physique_national}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_physique_national: text })
                }
              />

              <Text style={styles.label}>Note SVT</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_svt_national}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_svt_national: text })
                }
              />

              <Text style={styles.label}>Note anglais</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.note_anglais_national}
                onChangeText={(text) =>
                  setNotes({ ...notes, note_anglais_national: text })
                }
              />

              <Text style={styles.sectionLabel}>Moyenne</Text>

              <Text style={styles.label}>Moyenne générale du bac</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notes.moyenne_generale_bac}
                onChangeText={(text) =>
                  setNotes({ ...notes, moyenne_generale_bac: text })
                }
              />
            </ScrollView>
          </ProgressStep>

          {/* STEP 5 – IMAGE */}
          <ProgressStep
            label="Photo"
            // nextBtnText="Terminer"
            // previousBtnText="Précédent"
            onSubmit={handleSubmit}
          >
            <View style={styles.stepContent}>
              <Text style={styles.sectionLabel}>Photo de profil</Text>
              <Text style={styles.label}>
                Vous pouvez ajouter une URL d&apos;image pour le moment. Plus
                tard, vous pourrez utiliser un ImagePicker.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="https://... votre photo"
                value={imageUrl}
                onChangeText={setImageUrl}
              />

              <TouchableOpacity
                style={styles.fakeButton}
                onPress={() => {
                  // ici plus tard: ouvrir ImagePicker d'Expo
                  console.log("Choisir une image (à implémenter)");
                }}
              >
                <Text style={styles.fakeButtonText}>
                  Choisir une image depuis l'appareil
                </Text>
              </TouchableOpacity>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0396b",
    padding: 12,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#b0396b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  stepContent: {
    paddingVertical: 10,
    paddingBottom: 30,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8c6a99",
    marginTop: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    marginHorizontal: 4,
    marginTop: 8,
    color: "#555",
  },
  input: {
    width: "100%",
    height: 46,
    backgroundColor: "#f5f4f6",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#e0d7ec",
  },
  fakeButton: {
    marginTop: 16,
    backgroundColor: "#b0396b",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  fakeButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default EtudiantRegisterSteps;
