import {
  Image,
  Pressable,
  View
} from 'react-native';
import Logo from '../assets/images/logo.png';
// NavBar Component
import { useAuthStore } from '@/app/Store/authStore';
import { Avatar } from 'react-native-paper';
export default function NavBar () {
  const user =  useAuthStore.getState().userAccepted;

  return (
    <View    
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'#b0396b'}}
      className="bg-black px-4 py-3 shadow-lg"
    >
      <Pressable 
        // onPress={onMenuPress}
        className="p-2 active:opacity-70"
      >
        <Image
          source={Logo}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </Pressable>
      
      <Avatar.Text size={32} label={user.user.Prenom[0].toUpperCase()} />
    </View>
  );
};