import tw from '@/lib/tailwind';
import { useUserLogoutMutation } from '@/redux/authApi/authApiSlice';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Reusable Sub-Components ---

const DrawerItem = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={tw`flex-row items-center py-4`}
    onPress={onPress}>
    <Ionicons name={icon} size={20} color="#1D0303" style={tw`w-8`} />
    <Text style={tw`text-base font-RoboNormal text-primary`}>{label}</Text>
  </TouchableOpacity>
);

// --- Main Component ---
const CustomDrawerContent: React.FC = () => {

  const menuItems = [
    {
      label: 'Edit Profile',
      icon: 'person-outline',
      route: '/profile/editprofile',
    },
    {
      label: 'Notifications',
      icon: 'notifications-outline',
      route: '/notification/notification',
    },
    {
      label: 'Help & Support',
      icon: 'help-circle-outline',
      route: '/helpandSupport/helpAndSupport',
    },
    {
      label: 'Switch to user',
      icon: 'person-outline',
      route: '/auth/signIn',
    },
    {
      label: 'Change Password',
      icon: 'lock-closed-outline',
      route: '/common',
    },
    {
      label: 'Logout',
      icon: 'log-out-outline',
      route: 'logout', // 🚨 special identifier
    },
  ];

  const [logout, { isLoading }] = useUserLogoutMutation();

  // 🔥 SIGN OUT FUNCTION
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      await AsyncStorage.removeItem('token');

      router.replace('/auth/signIn');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleNavigation = (route: string) => {
    if (route === 'logout') {
      return handleLogout();
    }

    router.push(route as any);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-5`}>

        <View style={tw`flex-row justify-between items-center mb-10`}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={tw`w-40 h-16`}
            resizeMode="contain"
          />
        </View>

        {/* Menu Items */}
        <View>
          {menuItems.map(item => (
            <DrawerItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              onPress={() => handleNavigation(item.route)}
            />
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
