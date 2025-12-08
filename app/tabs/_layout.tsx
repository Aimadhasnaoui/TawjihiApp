import { Tabs } from "expo-router";
import { Bell, FileText, Home, MessageCircle, User } from 'lucide-react-native';
import { StatusBar } from "react-native";
export default function TabsLayout() {

  return (
    <>
      <StatusBar backgroundColor="#b0396b" barStyle="light-content" />
      <Tabs
      
      screenOptions={{ headerShown: false,
        tabBarActiveTintColor:'#b0396b'
       }} >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon:({color})=><Home color={color}></Home>
          }}
        />
        <Tabs.Screen
          name="Annonce"
          options={{
            title: "annonces",
            tabBarIcon:({color})=><Bell color={color}></Bell>
          }}
        />
        <Tabs.Screen
          name="Suivi"
          options={{
            title: "suivi",
            tabBarIcon:({color})=><FileText color={color}></FileText>
          }}
        />
        <Tabs.Screen
          name="Message"
          options={{
            title: "message",
            tabBarIcon:({color})=><MessageCircle color={color}></MessageCircle>
          }}
        />
        <Tabs.Screen
          name="Profil"
          options={{
            title: "profil",
            tabBarIcon:({color})=><User color={color}></User>
          }}
        />
      </Tabs>
    </>
  );
}