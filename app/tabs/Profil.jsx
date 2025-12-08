import { Button, Text, View } from "react-native";
import { useAuthStore } from '../Store/authStore';
export default function Profil(){
const {logout} = useAuthStore()
    return (
       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profil</Text>
      <Button title="logout" onPress={()=>{logout()}}></Button>
    </View>
    )
}