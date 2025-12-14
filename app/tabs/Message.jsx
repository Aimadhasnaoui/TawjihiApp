import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MessageLayout from '../../Component/Message/MessageLayout';
import { GetMessage } from "../../services/Message";
export default function Message(){
//   const data = [
//     {
//         "_id": "69394326b72d58f8cd1ca0ad",
//         "Titre": "Administration",
//         "Message": "Veuillez consulter votre profil pour les dernières mises à jour 1.",
//         "isGlobal": false,
//         "Type": "message",
//         "createdAt": "2025-12-10T09:53:42.992Z",
//         "updatedAt": "2025-12-10T09:53:42.992Z",
//         "__v": 0
//     },
//     {
//         "_id": "6939429fa92a27eaed80fea6",
//         "Titre": "Administration",
//         "Message": "Votre dossier est actuellement en attente. Nous vous informerons bientôt.",
//         "isGlobal": false,
//         "Type": "attente",
//         "etudiant": null,
//         "createdAt": "2025-12-10T09:51:27.127Z",
//         "updatedAt": "2025-12-10T09:51:27.127Z",
//         "__v": 0
//     },
//     {
//         "_id": "6939428ca92a27eaed80fea4",
//         "Titre": "École Polytechnique",
//         "Message": "Votre inscription est en cours de traitement. Veuillez compléter vos documents.",
//         "isGlobal": false,
//         "Type": "Inscription",
//         "etudiant": null,
//         "createdAt": "2025-12-10T09:51:08.976Z",
//         "updatedAt": "2025-12-10T09:51:08.976Z",
//         "__v": 0
//     },
//     {
//         "_id": "69394282a92a27eaed80fea2",
//         "Titre": "École Nationale Supérieure d'Informatique",
//         "Message": "Félicitations ! Votre dossier a été accepté.",
//         "isGlobal": false,
//         "Type": "Accepté",
//         "etudiant": null,
//         "createdAt": "2025-12-10T09:50:58.305Z",
//         "updatedAt": "2025-12-10T09:50:58.305Z",
//         "__v": 0
//     },
//     {
//         "_id": "6939427ba92a27eaed80fea0",
//         "Titre": "Institut National des Sciences Appliquées",
//         "Message": "Nous sommes désolés, votre candidature n'a pas été retenue.",
//         "isGlobal": false,
//         "Type": "Refusé",
//         "etudiant": null,
//         "createdAt": "2025-12-10T09:50:51.786Z",
//         "updatedAt": "2025-12-10T09:50:51.786Z",
//         "__v": 0
//     }
// ]
// const oneData = data[0]
const {data,isLoading,error,refetch,isRefetching} = useQuery({
    queryKey:["Message"],
    queryFn:GetMessage
})
  useEffect(() => {
if(!isLoading){
  console.log(data)
}
  }, [isLoading]);
    return (
    <View className="flex-1">
      {/* Header */}
      <View className="bg-[#b0396b] pt-2 pb-6 px-6 shadow-lg" style={styles.Gardient}>
        <Text className="text-white text-3xl font-bold">Messages</Text>
      </View>
         {isLoading && (
          <View className="flex-1 items-center justify-center py-20">
            <View className="bg-white rounded-full p-6 shadow-md">
              <Text className="text-[#b0396b] text-base font-medium">
                Chargement...
              </Text>
            </View>
          </View>
        )}
                {data && data.length === 0 && (
          <View className="items-center justify-center py-20">
            <View className="bg-white rounded-3xl p-8 shadow-sm items-center">
              <Feather name="inbox" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                Aucune Message
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                Revenez plus tard
              </Text>
            </View>
          </View>
        )}
                              {!isLoading && data && data.length > 0 &&(
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    tintColor="#b0396b"
                    colors={["#b0396b"]}
                  />
                }
              >


                {
                  data.map((message,index)=>(
                    <MessageLayout key={index} Message={message}></MessageLayout>
                  ))
                }
              </ScrollView>
                      )} 
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