import {
  AlertTriangle,
  CalendarDays,
  Camera,
  IdCard,
  LogOut,
  MapPin,
  User,
  Edit3
} from "lucide-react-native";
import {  Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../Store/authStore";

export default function Profil() {
  const { logout } = useAuthStore();

  const user = {
    infos_personnelles: {
      prenom_fr: "aimad",
      nom_fr: "hasnaoui",
      prenom_ar: "هدف",
      nom_ar: "حسناوي",
      date_naissance: "2003-02-08T00:00:00.000Z",
      lieu_naissance: "agadir",
      cin_eleve: "K235535",
    },
    Image: null,
  };

  const fullNameFr =
    user.infos_personnelles.prenom_fr +
    " " +
    user.infos_personnelles.nom_fr;

  const fullNameAr =
    user.infos_personnelles.prenom_ar +
    " " +
    user.infos_personnelles.nom_ar;
    // ---- Format date in French: 8 février 2003 ----
  const formatDateFr = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const monthsFr = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const day = d.getDate();
    const month = monthsFr[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const birthDateLabel = formatDateFr(
    user.infos_personnelles.date_naissance
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f4f6" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon Profil</Text>
      </View>

      {/* AVATAR + CAMERA */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarContainer}>
          {user.Image ? (
            <Image
              source={{ uri: user.Image }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <User size={48} color="#58277f" />
            </View>
          )}

          <View style={styles.cameraButton}>
            <Camera size={18} color="#fff" />
          </View>
        </View>

        {/* Names */}
        <Text style={styles.nameFr}>{fullNameFr}</Text>
        <Text style={styles.nameAr}>{fullNameAr}</Text>
      </View>
      <ScrollView  contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 8}}>
                {/* SECTION TITLE */}
          <Text style={styles.sectionTitle}>
            INFORMATIONS PERSONNELLES
          </Text>
 {!user.isAllInfo && (
            <View style={styles.alertCard}>
              <View style={styles.alertCardText}>
                  <View style={styles.alertIconCircle}>
                <AlertTriangle size={22} color="#c27803" />
              </View>
                 <View>
                <Text style={styles.alertTitle}>Profil incomplet</Text>
              </View>
              </View>
                 <View>
                <Text style={styles.alertSubtitle}>
                  Veuillez compléter vos informations personnelles pour
                  finaliser votre inscription.
                </Text>
              </View>
                 <TouchableOpacity style={styles.alertButton}>
                <Text style={styles.alertButtonText}>
                  Compléter maintenant
                </Text>
              </TouchableOpacity> 
            </View>
          )}
          {/* INFO CARDS */}
          <View style={{ gap: 12 ,padding:4}}>
            {/* Date de naissance */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <CalendarDays size={22} color="#b0396b" />
              </View>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoLabel}>Date de naissance</Text>
                <Text style={styles.infoValue}>{birthDateLabel}</Text>
              </View>
            </View>

            {/* Lieu de naissance */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <MapPin size={22} color="#b0396b" />
              </View>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoLabel}>Lieu de naissance</Text>
                <Text style={styles.infoValue}>
                  {user.infos_personnelles.lieu_naissance}
                </Text>
              </View>
            </View>

            {/* CIN */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <IdCard size={22} color="#b0396b" />
              </View>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoLabel}>CIN</Text>
                <Text style={styles.infoValue}>
                  {user.infos_personnelles.cin_eleve}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.sectionTitle}>
            Paramètres
          </Text>
            <View style={{ gap: 4 ,padding:4}}>
            {/* Date de naissance */}
            <TouchableOpacity style={styles.settingsButton}>
  <View style={styles.editIconWrapper}>
    <Edit3 size={22} color="#58277f" />
  </View>

  <Text style={styles.settingsText}>Mettre à jour votre profil</Text>

  {/* Optional arrow → looks clean */}
  <View style={styles.arrowIcon}>
    <Edit3 size={20} color="#58277f" />
  </View>
</TouchableOpacity>

<TouchableOpacity style={styles.settingsButton}>
  <View style={styles.logoutIconWrapper}>
    <LogOut size={22} color="#DC0000" />
  </View>

  <Text style={styles.settingsText}>Logout</Text>

  {/* Optional arrow */}
  <View style={styles.arrowIcon}>
    <LogOut size={20} color="#DC0000" />
  </View>
</TouchableOpacity>

            {/* <TouchableOpacity style={styles.infoCardParametr}>
              <View style={styles.infoIconCircleEdit}>
                <Edit3 size={22} color="#b0396b" />
              </View>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoValue}>Mettre à jour votre profil</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoCardParametr}>
              <View style={styles.infoIconCircleLougout}>
                <LogOut  size={22} color="#DC0000" />
              </View>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoValue}>Logout</Text>
              </View>
            </TouchableOpacity> */}

          </View>
          </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#b0396b",
    paddingTop: 20,
    paddingBottom: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: -50,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "#b0396ba3",
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "white",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "#b0396b",
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  nameFr: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },

  nameAr: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
   content: {
    marginTop: 24,
    paddingHorizontal: 16,
    gap: 16,
  },

  // Alert banner
  alertCard: {
    // flexDirection: "row",
    backgroundColor: "#fff8e6",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffd48a",
    alignItems: "flex-start",
    gap: 12,
  },
  alertCardText: {
    flexDirection: "row",
    gap: 6,
  },
  alertIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#ffe9c4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  alertTextWrapper: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7a4b01",
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 13,
    color: "#7a4b01",
  },
  alertButton: {
    alignSelf: "center",
    backgroundColor: "#f28b1a",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  alertButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },

  // Section
  sectionTitle: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#8c6a99",
    letterSpacing: 1,
    marginLeft:6,
  },

  // Info cards
  infoCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    // light shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoCardParametr: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    // light shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#f7dff5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoIconCircleLougout: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "rgba(255, 56, 56, 0.2)",
  },
  infoIconCircleEdit: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "rgba(88, 39, 127, 0.2)", // 👈 same color, transparent
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#9b8a9f",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  settingsButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 16,
  marginTop: 10,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},

settingsText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#222",
},

editIconWrapper: {
  width: 40,
  height: 40,
  borderRadius: 999,
  backgroundColor: "rgba(88, 39, 127, 0.15)",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
},

logoutIconWrapper: {
  width: 40,
  height: 40,
  borderRadius: 999,
  backgroundColor: "rgba(255, 56, 56, 0.15)",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
},

arrowIcon: {
  marginLeft: "auto",
  opacity: 0.4,
},

});
