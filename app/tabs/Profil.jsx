import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  CalendarDays,
  Camera,
  Edit3,
  IdCard,
  LogOut,
  MapPin,
  User,
  Mail,
  Phone,
  Shield,
  GraduationCap,
  School,
  BookOpen,
  Users,
  UserCircle,
  Award,
} from "lucide-react-native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GetEtudient } from "../../services/User";
import { useAuth } from "../context/AuthContext";

export default function Profil() {
  const { logout, user: authUser } = useAuth();

  const { data, isPending, error, refetch, isRefetching, isSuccess } = useQuery(
    {
      queryKey: ["profil", authUser?.user?.id],
      queryFn: () => GetEtudient(authUser?.user?.id),
      enabled: !!authUser?.user?.id,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess, data]);

  // ---- Format date in French: 8 février 2003 ----
  const formatDateFr = (iso) => {
    if (!iso) return "Non renseigné";
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

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <AlertTriangle size={48} color="#DC0000" />
        <Text style={{ marginTop: 10, color: "#DC0000", textAlign: "center" }}>
          Erreur lors du chargement du profil.
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#b0396b",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Fallback if data is null for some reason
  const userData = data || {};
  const infos = userData?.infos_personnelles || {};
  const contact = userData?.contact || {};
  const tuteur = userData?.tuteur || {};
  const scolaire = userData?.scolaire || {};
  const notes = userData?.notes || {};

  const fullNameFr =
    infos.prenom_fr && infos.nom_fr
      ? `${infos.prenom_fr} ${infos.nom_fr}`
      : "Utilisateur";
  const fullNameAr =
    infos.prenom_ar && infos.nom_ar ? `${infos.prenom_ar} ${infos.nom_ar}` : "";

  const birthDateLabel = formatDateFr(infos.date_naissance);

  // Helper to get tuteur type label
  const getTuteurTypeLabel = (type) => {
    const types = {
      pere: "Père",
      mere: "Mère",
      autre: "Autre tuteur",
    };
    return types[type] || type;
  };

  // Helper to get lycee type label
  const getLyceeTypeLabel = (type) => {
    const types = {
      public: "Public",
      prive: "Privé",
    };
    return types[type] || type;
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <View style={styles.infoCard}>
      <View style={styles.infoIconCircle}>
        <Icon size={22} color="#b0396b" />
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || "Non renseigné"}</Text>
      </View>
    </View>
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
          {userData.Image ? (
            <Image
              source={{ uri: userData.Image }}
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

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 8,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ALERT: Profil incomplet */}
        {!userData.isAllInfo && (
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
                Veuillez compléter vos informations personnelles pour finaliser
                votre inscription.
              </Text>
            </View>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Compléter maintenant</Text>
            </TouchableOpacity>
          </View>
        )}

        {isPending ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <ActivityIndicator size="large" color="#b0396b" />
            <Text style={{ marginTop: 10, color: "#666" }}>
              Chargement du profil...
            </Text>
          </View>
        ) : (
          <>
            {/* SECTION: INFORMATIONS PERSONNELLES */}
            <Text style={styles.sectionTitle}>INFORMATIONS PERSONNELLES</Text>
            <View style={{ gap: 12, padding: 4 }}>
              <InfoRow
                icon={CalendarDays}
                label="Date de naissance"
                value={birthDateLabel}
              />
              <InfoRow
                icon={MapPin}
                label="Lieu de naissance"
                value={infos.lieu_naissance}
              />
              <InfoRow icon={IdCard} label="CIN" value={infos.cin_eleve} />
            </View>

            {/* SECTION: CONTACT */}
            <Text style={styles.sectionTitle}>CONTACT</Text>
            <View style={{ gap: 12, padding: 4 }}>
              <InfoRow
                icon={MapPin}
                label="Ville de résidence"
                value={contact.ville_residence}
              />
              <InfoRow
                icon={MapPin}
                label="Adresse (Français)"
                value={contact.adresse_fr}
              />
              <InfoRow
                icon={MapPin}
                label="العنوان (العربية)"
                value={contact.adresse_ar}
              />
              <InfoRow icon={Mail} label="Email" value={contact.email} />
              <InfoRow
                icon={Mail}
                label="Code Email"
                value={contact.email_code}
              />
              <InfoRow
                icon={Phone}
                label="Téléphone élève"
                value={contact.tel_eleve}
              />
            </View>

            {/* SECTION: TUTEUR */}
            <Text style={styles.sectionTitle}>TUTEUR / PARENTS</Text>
            <View style={{ gap: 12, padding: 4 }}>
              <InfoRow
                icon={Users}
                label="Type de tuteur"
                value={getTuteurTypeLabel(tuteur.type_tuteur)}
              />
              <InfoRow
                icon={Phone}
                label="Téléphone tuteur"
                value={tuteur.tel_tuteur}
              />

              {/* Father Info */}
              <InfoRow
                icon={UserCircle}
                label="Nom du père (Français)"
                value={
                  tuteur.prenom_pere_fr && tuteur.nom_pere_fr
                    ? `${tuteur.prenom_pere_fr} ${tuteur.nom_pere_fr}`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={UserCircle}
                label="اسم الأب (العربية)"
                value={
                  tuteur.prenom_pere_ar && tuteur.nom_pere_ar
                    ? `${tuteur.prenom_pere_ar} ${tuteur.nom_pere_ar}`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={IdCard}
                label="CIN du père"
                value={tuteur.cin_pere}
              />

              {/* Mother Info */}
              <InfoRow
                icon={UserCircle}
                label="Nom de la mère (Français)"
                value={
                  tuteur.prenom_mere_fr && tuteur.nom_mere_fr
                    ? `${tuteur.prenom_mere_fr} ${tuteur.nom_mere_fr}`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={UserCircle}
                label="اسم الأم (العربية)"
                value={
                  tuteur.prenom_mere_ar && tuteur.nom_mere_ar
                    ? `${tuteur.prenom_mere_ar} ${tuteur.nom_mere_ar}`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={IdCard}
                label="CIN de la mère"
                value={tuteur.cin_mere}
              />
            </View>

            {/* SECTION: SCOLAIRE */}
            <Text style={styles.sectionTitle}>INFORMATIONS SCOLAIRES</Text>
            <View style={{ gap: 12, padding: 4 }}>
              <InfoRow
                icon={Shield}
                label="Code Massar"
                value={scolaire.massar_id}
              />
              <InfoRow
                icon={Shield}
                label="Code Massar (Code)"
                value={scolaire.massar_code}
              />
              <InfoRow
                icon={GraduationCap}
                label="Option Bac"
                value={scolaire.option_bac}
              />
              <InfoRow
                icon={School}
                label="Nom du lycée"
                value={scolaire.lycee_nom}
              />
              <InfoRow
                icon={School}
                label="Type de lycée"
                value={getLyceeTypeLabel(scolaire.lycee_type)}
              />
            </View>

            {/* SECTION: NOTES */}
            <Text style={styles.sectionTitle}>NOTES & RÉSULTATS</Text>
            <View style={{ gap: 12, padding: 4 }}>
              <InfoRow
                icon={Award}
                label="Note Français (Régional)"
                value={
                  notes.note_francais_regional
                    ? `${notes.note_francais_regional}/20`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={Award}
                label="Note Arabe (Régional)"
                value={
                  notes.note_arabe_regional
                    ? `${notes.note_arabe_regional}/20`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={BookOpen}
                label="Moyenne 1ère année"
                value={
                  notes.moyenne_1ere_annee
                    ? `${notes.moyenne_1ere_annee}/20`
                    : "Non renseigné"
                }
              />
              <InfoRow
                icon={BookOpen}
                label="Note S1 2ème année"
                value={
                  notes.note_s1_2eme_annee
                    ? `${notes.note_s1_2eme_annee}/20`
                    : "Non renseigné"
                }
              />
            </View>

            {/* SECTION: SETTINGS */}
            <Text style={styles.sectionTitle}>PARAMÈTRES</Text>
            <View style={{ gap: 4, padding: 4 }}>
              <TouchableOpacity style={styles.settingsButton}>
                <View style={styles.editIconWrapper}>
                  <Edit3 size={22} color="#58277f" />
                </View>

                <Text style={styles.settingsText}>
                  Mettre à jour votre profil
                </Text>

                <View style={styles.arrowIcon}>
                  <Edit3 size={20} color="#58277f" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingsButton} onPress={logout}>
                <View style={styles.logoutIconWrapper}>
                  <LogOut size={22} color="#DC0000" />
                </View>

                <Text style={styles.settingsText}>Déconnexion</Text>

                <View style={styles.arrowIcon}>
                  <LogOut size={20} color="#DC0000" />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
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

  // Alert banner
  alertCard: {
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
    marginLeft: 6,
  },

  // Info cards
  infoCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
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