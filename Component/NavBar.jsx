import {
  Menu
} from 'lucide-react-native';
import {
  Pressable,
  Text,
  View
} from 'react-native';

// NavBar Component
export default function NavBar ({ onMenuPress, userName = "Utilisateur" }) {
  return (
    <View    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
      className="bg-[#b0396b] px-4 py-3  shadow-lg">
      <Pressable 
        onPress={onMenuPress}
        className="p-2 active:opacity-70"
      >
        <Menu color="white" size={28} />
      </Pressable>
      
      <View className="w-10 h-10 bg-pink-300 rounded-full items-center justify-center border-2 border-white">
        <Text className="text-[#b0396b] font-bold text-lg">
          {userName.charAt(0).toUpperCase()}
        </Text>
      </View>
    </View>
  );
};
