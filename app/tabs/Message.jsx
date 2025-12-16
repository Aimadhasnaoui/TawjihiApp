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