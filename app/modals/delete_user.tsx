import { cross } from '@/assets/icons/Icon';
import tw from '@/lib/tailwind';
import { useDeleteOrganizerProfileMutation } from '@/redux/organizer/organizerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const DeleteUser: React.FC = () => {

  const [deleteProfile, { isLoading }] = useDeleteOrganizerProfileMutation();

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // Add account deletion logic here
            await deleteProfile().unwrap();
            await AsyncStorage.removeItem('token');
            router.replace('/auth/signIn');
            // router.back();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={tw` bg-white`}>
      <View style={tw`p-5`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Text style={tw`font-RoboBold text-2xl text-[#1D0303]`}>Delete Account</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <SvgXml xml={cross} />
          </TouchableOpacity>
        </View>

        {/* Warning Text */}
        <Text style={tw`text-gray-700 text-base mb-6`}>
          Are you sure you want to delete your account? This action is irreversible.
        </Text>

        {/* Buttons */}
        <View style={tw`flex-row justify-between gap-3`}>
          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`flex-1 bg-gray-200 rounded-lg py-3 items-center`}
          >
            <Text style={tw`text-gray-800 text-sm font-RoboBold`}>Cancel</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            onPress={handleDelete}
            style={tw`flex-1 bg-red-500 rounded-lg py-3 items-center`}
          >
            <Text style={tw`text-white text-sm font-RoboBold`}>{
              isLoading ? 'Deleting...' : 'Delete'
            } </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteUser;
