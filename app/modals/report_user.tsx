import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';





const Report_user: React.FC = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [teamTagline, setTeamTagline] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateTeam = () => {
    if (!teamName) {
      Alert.alert('Error', 'Please enter a team name.');
      return;
    }

    router.back();
  };




  return (
    <View style={tw` bg-white`}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw``}>


        <ScrollView contentContainerStyle={tw`p-5`}>
          <Text style={tw`font-RoboBold text-2xl text-[#1D0303] mb-4`}>Report User</Text>

          {/* Team Name Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>Reported By</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg h-12 px-4 text-base`}
              placeholder="@username"
              value={teamName}
              onChangeText={setTeamName}
            />
          </View>

          {/* Team Tagline Input */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-base font-RoboNormal text-[#1D0303] mb-2`}>Against</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg h-12 px-4 text-base`}
              placeholder="@username"
              value={teamTagline}
              onChangeText={setTeamTagline}
            />
          </View>

          {/* Add Members */}
          <View style={tw` rounded-lg`}>
            <Text style={tw`text-base font-RoboMedium text-[#1D0303] `}>Reason</Text>
            <View style={tw`flex-row items-center `}>
              <TextInput
                style={tw`flex-1 border border-gray-300 bg-white rounded-lg h-20 px-4 text-base`}
                placeholder="what is the reason?"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

            </View>

          </View>

        </ScrollView>
        {/* Create Team Button */}
        <View style={tw`p-5 flex-row justify-between max-w-[400px] `}>
          <TouchableOpacity onPress={() => router.back()} style={tw` flex-1 border border-[#1D0303] mr-2 rounded-xl py-4 items-center`}>
            <Text style={tw`text-[#1D0303] text-base font-RoboBold`}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateTeam} style={tw`bg-[#1D0303] flex-1 rounded-xl py-4 items-center`}>
            <Text style={tw`text-white text-base font-RoboBold`}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Report_user;
