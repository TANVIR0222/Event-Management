import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const usersData = [
  { id: 1, name: 'Alice Smith', username: '@alicesmith' },
  { id: 2, name: 'Bob Johnson', username: '@bobjohnson' },
  { id: 3, name: 'Catherine Williams', username: '@catherinewilliams' },
  { id: 4, name: 'David Brown', username: '@davidbrown' },
];

const View_teamlist: React.FC = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof usersData[number] }) => (
    <View style={tw`bg-[#D9D9D9] p-3 rounded-lg mb-3 border-b border-gray-400`}>
      <Text style={tw`text-lg font-RoboBold text-[#1D0303]`}>
        {item.name}
      </Text>
      <Text style={tw`text-sm text-[#1D0303] opacity-70`}>
        {item.username}
      </Text>
    </View>
  );

  return (
    <View style={tw` bg-white p-4`}>
      <Text style={tw`font-RoboBold text-2xl text-[#1D0303] mb-2 text-center`}>
        Dhaka Football League
      </Text>

      <Text style={tw`font-RoboBold text-xl text-[#1D0303] mb-4`}>
        Team Members
      </Text>


      <View style={tw`bg-[#D9D9D9] p-3 rounded-lg mb-3 `}>

        <FlatList
          data={usersData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>


      <View style={tw`items-end mt-4`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={tw`text-lg font-RoboBold text-[#1D0303]`}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default View_teamlist;
