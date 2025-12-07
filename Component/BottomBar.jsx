import { Bell, FileText, Home, MessageCircle, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomBar() {
  const [activeTab, setActiveTab] = useState('actualites');

  const tabs = [
    { id: 'actualites', Icon: Home, label: 'Actualités' },
    { id: 'annonces', Icon: Bell, label: 'Annonces' },
    { id: 'message', Icon: MessageCircle, label: 'Message' },
    { id: 'suivi', Icon: FileText, label: 'Suivi' },
    { id: 'profil', Icon: User, label: 'Profil' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <tab.Icon
              size={24}
              color={isActive ? '#58277f' : '#ffffffff'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? '#58277f' : '#ffffffff' },
                isActive && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#b0396b',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  labelActive: {
    fontWeight: '600',
  },
});