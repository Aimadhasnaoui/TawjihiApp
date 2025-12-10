// import { Camera, User } from "lucide-react-native";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   View
// } from "react-native";
// import { useAuthStore } from '../Store/authStore';
// export default function Profil(){

// const {logout} = useAuthStore()
// const user =  {
//         "infos_personnelles": {
//             "prenom_fr": "aimad",
//             "nom_fr": "hasnaoui",
//             "prenom_ar": "هدف",
//             "nom_ar": "حسناوي",
//             "date_naissance": "2003-02-08T00:00:00.000Z",
//             "lieu_naissance": "agadir",
//             "cin_eleve": "K235535"
//         },
//         "_id": "692ed3cabae6ab08c3f71e8e",
//         "Image": null,
//         "isAllInfo": false,
//         "createdAt": "2025-12-02T11:55:54.490Z",
//         "updatedAt": "2025-12-02T11:55:54.490Z",
//         "__v": 0
//     }
//     return (
//        <View style={{ flex: 1}}>
//         <View className="bg-[#b0396b]   px-6 shadow-lg text-centre  items-center justify-center" style={styles.Gardient}>
//                 <Text className="text-white text-3xl font-bold">Mon Profil</Text>
//               </View>
//                 <View className="flex-row justify-center -mt-16 relative z-10">
//         <View style={styles.moveit}>
//           {user.Image ? (
//             <Image
//               src={user.Image || "/placeholder.svg"}
//               alt="Profile"
//               className="w-28 h-28 rounded-full border-4 border-card object-cover shadow-lg"
//             />
//           ) : (
//             <View style={styles.UserIcon} className="rounded-full border-2 border-black flex-row items-center justify-center">
//               <User className="w-12 h-12 text-[#58277f]" color='#58277f' />
//             </View>
//           )}
//           <View className="absolute rounded-full  flex items-center justify-center  border-2 border-white" style={styles.cameraIcon}>
//             <Camera  color={'#ffffffff'} />
//           </View>
//           <View>
//             <Text className='font-bold text-2xl'>aimad hasnaoui</Text>
//           </View>
//           <View>
//             <Text className='font-bold text-2xl'>عماد حسناوي</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//     )
// }
// const styles = StyleSheet.create({
//   Gardient:{
//        paddingBottom: 40,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   moveit:{
//     position:'relative',
//     top:-30
//   },
//   UserIcon:{
//     width: 80,
//     height: 80,
//     backgroundColor:"#b0396ba3",
//     borderColor:"#ffffffff"
//   },
//   cameraIcon:{
//     width: 30,
//     height: 30,
//     backgroundColor:"#b0396bff",
//     borderColor:"#ffffffff",
//   },
// })
import {
  CalendarDays,
  Camera,
  IdCard,
  MapPin,
  User
} from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";
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
      <View style={{ padding:4}}>
                {/* SECTION TITLE */}
          <Text style={styles.sectionTitle}>
            INFORMATIONS PERSONNELLES
          </Text>

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
          </View>
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
    flexDirection: "row",
    backgroundColor: "#fff8e6",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffd48a",
    alignItems: "flex-start",
    gap: 12,
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
});
