import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MessageLayout from '../../Component/Message/MessageLayout';
export default function Message(){
  const data = [
    {
        "_id": "69394326b72d58f8cd1ca0ad",
        "Titre": "Administration",
        "Message": "Veuillez consulter votre profil pour les dernières mises à jour 1.",
        "isGlobal": false,
        "Type": "message",
        "createdAt": "2025-12-10T09:53:42.992Z",
        "updatedAt": "2025-12-10T09:53:42.992Z",
        "__v": 0
    },
    {
        "_id": "6939429fa92a27eaed80fea6",
        "Titre": "Administration",
        "Message": "Votre dossier est actuellement en attente. Nous vous informerons bientôt.",
        "isGlobal": false,
        "Type": "attente",
        "etudiant": null,
        "createdAt": "2025-12-10T09:51:27.127Z",
        "updatedAt": "2025-12-10T09:51:27.127Z",
        "__v": 0
    },
    {
        "_id": "6939428ca92a27eaed80fea4",
        "Titre": "École Polytechnique",
        "Message": "Votre inscription est en cours de traitement. Veuillez compléter vos documents.",
        "isGlobal": false,
        "Type": "Inscription",
        "etudiant": null,
        "createdAt": "2025-12-10T09:51:08.976Z",
        "updatedAt": "2025-12-10T09:51:08.976Z",
        "__v": 0
    },
    {
        "_id": "69394282a92a27eaed80fea2",
        "Titre": "École Nationale Supérieure d'Informatique",
        "Message": "Félicitations ! Votre dossier a été accepté.",
        "isGlobal": false,
        "Type": "Accepté",
        "etudiant": null,
        "createdAt": "2025-12-10T09:50:58.305Z",
        "updatedAt": "2025-12-10T09:50:58.305Z",
        "__v": 0
    },
    {
        "_id": "6939427ba92a27eaed80fea0",
        "Titre": "Institut National des Sciences Appliquées",
        "Message": "Nous sommes désolés, votre candidature n'a pas été retenue.",
        "isGlobal": false,
        "Type": "Refusé",
        "etudiant": null,
        "createdAt": "2025-12-10T09:50:51.786Z",
        "updatedAt": "2025-12-10T09:50:51.786Z",
        "__v": 0
    }
]
const oneData = data[0]
    return (
    <View className="flex-1">
      {/* Header */}
      <View className="bg-[#b0396b] pt-2 pb-6 px-6 shadow-lg" style={styles.Gardient}>
        <Text className="text-white text-3xl font-bold">Messages</Text>
      </View>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16 }}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={isRefetching}
                //     onRefresh={refetch}
                //     tintColor="#b0396b"
                //     colors={["#b0396b"]}
                //   />
                // }
              >
                {
                  data.map((message,index)=>(
                    <MessageLayout key={index} Message={message}></MessageLayout>
                  ))
                }
                {/* <View>
                  <Text>Hello</Text>
                </View> */}
              </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  Gardient:{
       padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  }
})