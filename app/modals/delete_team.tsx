import { cross } from '@/assets/icons/Icon';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';





const Delete_Team: React.FC = () => {
  const router = useRouter();


  const handleDelete = () => {

    Alert.alert(
      'Delete Team',
      'Are you sure you want to delete this team?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Add team deletion logic here
            router.back();
          },
        },
      ],
      { cancelable: false }
    )
  };




  return (
    <View style={tw` bg-white`}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw``}>


        <View style={tw`p-5 pb-6`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`font-RoboBold text-2xl text-[#1D0303] mb-4`}>Delete Team</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <SvgXml xml={cross} />
            </TouchableOpacity>
          </View>
          <Text>After deleting the team, there is no going back. Are you sure to delete this team ? </Text>
          <View style={tw`flex-row items-center justify-end`}>
            <View style={tw`flex-row items-center justify-between mt-4 max-w-[200px]`}>
              <TouchableOpacity onPress={handleDelete} style={tw`flex-1 bg-red-500 rounded-lg  mr-2 p-4`}>
                <Text style={tw`text-white text-xs font-RoboBold`}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={tw`bg-[#1D0303] rounded-lg p-4 `}>

                <Text style={tw`text-white text-xs font-RoboBold`}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Delete_Team;
