// Sidebar Component
import {
  Home,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Newspaper,
  User,
  X
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';

export default function Sidebar  ({ visible, onClose, userName = "Utilisateur", userEmail = "user@example.com" }){
  const [activeItem, setActiveItem] = useState('accueil');

  const menuItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'actualite', label: 'Actualité', icon: Newspaper },
    { id: 'annonce', label: 'Annonce', icon: MessageSquare },
    { id: 'courrier', label: 'Courrier', icon: Mail },
    { id: 'suivi', label: 'Suivi', icon: MapPin },
  ];

  const handleItemPress = (itemId) => {
    setActiveItem(itemId);
    // Navigation logic here
    console.log(`Navigating to: ${itemId}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Sidebar Content */}
        <View className="w-[80%] bg-white h-full">
          {/* Header with User Info */}
          <View className="bg-[#b0396b] px-6 py-8 pb-6">
            <Pressable 
              onPress={onClose}
              className="absolute top-4 right-4 p-2"
            >
              <X color="white" size={24} />
            </Pressable>
            
            <View className="items-center mt-4">
              <View className="w-20 h-20 bg-pink-300 rounded-full items-center justify-center border-4 border-white mb-3">
                <Text className="text-[#b0396b] font-bold text-3xl">
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text className="text-white text-xl font-bold">{userName}</Text>
              <Text className="text-pink-100 text-sm mt-1">{userEmail}</Text>
            </View>
          </View>

          {/* Menu Items */}
          <ScrollView className="flex-1 py-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleItemPress(item.id)}
                  className={`flex-row items-center px-6 py-4 ${
                    isActive ? 'bg-pink-50 border-l-4 border-[#b0396b]' : ''
                  }`}
                >
                  <IconComponent 
                    color={isActive ? '#b0396b' : '#6B7280'} 
                    size={24} 
                  />
                  <Text className={`ml-4 text-base ${
                    isActive ? 'text-[#b0396b] font-semibold' : 'text-gray-700'
                  }`}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Logout Button */}
          <View className="border-t border-gray-200">
            <Pressable
              onPress={handleLogout}
              className="flex-row items-center px-6 py-4 active:bg-gray-100"
            >
              <LogOut color="#DC2626" size={24} />
              <Text className="ml-4 text-base text-red-600 font-medium">
                Déconnexion
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Overlay - Clickable to close */}
        <Pressable 
          className="flex-1 bg-black/50"
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};
