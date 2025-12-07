import {
  Image,
  Pressable,
  View
} from 'react-native';
import Logo from '../assets/images/logo.png';
// NavBar Component
import { Avatar } from 'react-native-paper';

export default function NavBar ({ onMenuPress, userName = "Utilisateur" }) {
  return (
    <View    
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
      className="bg-[#b0396b] px-4 py-3 shadow-lg"
    >
      <Pressable 
        onPress={onMenuPress}
        className="p-2 active:opacity-70"
      >
        <Image
          source={Logo}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </Pressable>
      
      <Avatar.Text size={32} label="XD" />
    </View>
  );
};