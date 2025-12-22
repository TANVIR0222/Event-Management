import GlobalLoading from '@/components/GlobalLoading';
import { formatDate } from '@/lib/lib';
import tw from '@/lib/tailwind';
import { useViewMySingleEventDetailsQuery } from '@/redux/createEvent/createdEventApi';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Reusable Sub-Components ---


const StatCard = ({ icon, value, label }: { icon: any, value: string, label: string }) => (
  <View style={tw`bg-white rounded-lg p-4 items-center justify-center shadow-md w-[31%]`}>
    <Ionicons name={icon} size={28} color="#1D0303" />
    <Text style={tw`text-lg font-RoboBold text-primary mt-2`}>{value}</Text>
    <Text style={tw`text-xs font-RoboNormal text-gray-600 text-center mt-1`}>{label}</Text>
  </View>
);


// --- Main Screen ---
const EventOverview: React.FC = () => {

  const { id } = useLocalSearchParams();
  const { data, isLoading } = useViewMySingleEventDetailsQuery({ id: id });

  // console.log(data?.data?.event);
  const event = data?.data?.event;

  const WINNER_COLORS = [
    { bg: '#FFF7CC', text: '#F0DC00' }, // 1st
    { bg: '#F2F2F2', text: '#8C8C8C' }, // 2nd
    { bg: '#FFE6CC', text: '#FF8000' }, // 3rd
  ];




  return isLoading ? <GlobalLoading /> : (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={tw`flex-row items-center p-4`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-1`}>
          <Ionicons name="arrow-back" size={24} color="#1D0303" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`pb-10 px-5`}>
        {/* Event Title Card */}
        <View style={tw`bg-[#E8E7E7]/20 border border-[#E8E7E7] shadow-xl  shadow-[#FFFFFF] rounded-xl p-4 mb-6`}>
          <Text style={tw`text-xl font-RoboBold text-primary mb-3 text-center font-semibold`}>{event?.title}</Text>

          <View style={tw`flex-row flex-wrap items-center justify-between`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="calendar-outline" size={16} color="#1D0303" style={tw`mr-2`} />
              <Text style={tw`text-xs font-RoboNormal text-gray-700`}>${formatDate(event?.starting_date)} - ${formatDate(
                event?.ending_date
              )} ${event?.time}</Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="location-outline" size={16} color="#1D0303" style={tw`mr-2`} />
              <Text style={tw`text-xs font-RoboNormal text-gray-700`}>{event?.location}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="trophy-outline" size={16} color="#1D0303" style={tw`mr-2`} />
              <Text style={tw`text-xs font-RoboNormal text-gray-700`}>{event?.prize_amount}</Text>
            </View>
          </View>
        </View>

        {/* Joined Players Card */}
        {data?.data?.joined_players?.length > 0 && <View style={tw`bg-[#E8E7E7]/20 border border-[#E8E7E7] shadow-xl  shadow-[#FFFFFF] rounded-xl  p-4 mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-base font-RoboMedium text-primary`}>Joined Players</Text>
            <Text style={tw`text-xs font-RoboNormal text-gray-600`}>{data?.data?.joined}/{data?.data?.max}</Text>
          </View>
          {/*  */}
          <View style={tw`h-px bg-gray-200 mb-2`} />
          {data?.data?.joined_players?.map((player, index) => {
            return (
              <View key={index} >
                <View style={tw`flex-row items-center py-3`}>

                  <Image source={{ uri: player?.player?.avatar_url }} style={tw`w-11 h-11 rounded-full justify-center items-center mr-4 `} />
                  <View>
                    <Text style={tw`text-sm font-RoboMedium text-primary`}>
                      {player?.player?.full_name}
                    </Text>
                    <Text style={tw`text-xs font-RoboNormal text-gray-600 mt-1`}>
                      Joined: {formatDate(player?.joining_date)}
                    </Text>
                  </View>
                </View>
                <View style={tw`h-px bg-gray-200`} />
              </View>
            )
          })}
        </View>}

        {/* Winners Card */}
        {data?.data?.top_3_winners?.length > 0 && <View style={tw`bbg-[#E8E7E7]/20 border border-[#E8E7E7] shadow-xl  shadow-[#FFFFFF] rounded-xl  p-4 mb-6`}>
          <Text style={tw`text-base font-RoboMedium text-primary mb-2`}>Top 3 Winners</Text>
          <View style={tw`h-px bg-gray-200 mb-2`} />
          {data?.data?.top_3_winners?.map((winner, index) => {
            const color = WINNER_COLORS[index];
            return (
              <View key={index}>
                <View style={tw`flex-row items-center justify-between py-3`}>
                  <View style={tw`flex-row items-center flex-1`}>

                    {/* Place circle */}
                    <View
                      style={[
                        tw`w-11 h-11 rounded-full justify-center items-center mr-4`,
                        { backgroundColor: color.bg },
                      ]}>
                      <Text
                        style={[
                          tw`text-base font-RoboBold`,
                          { color: color.text },
                        ]}>
                        {winner.place}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => router.push('/modals/winner_selection')}
                      style={tw`bg-primary rounded-md`}>
                      <Text style={tw`text-white font-RoboMedium px-6 py-2`}>
                        Select Winner
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={tw`text-sm font-RoboBold text-primary`}>
                    {winner.amount}
                  </Text>
                </View>

                <View style={tw`h-px bg-gray-200`} />
              </View>
            );
          })}

        </View>}

        {/* Event Status Section */}
        <View style={tw`bbg-[#E8E7E7]/20 border border-[#E8E7E7] shadow-xl  shadow-[#FFFFFF] rounded-xl  p-4`}>
          <Text style={tw`text-base font-RoboMedium text-primary mb-2`}>Event Status</Text>
          <View style={tw`h-px bg-gray-200 mb-4`} />
          <View style={tw`flex-row justify-between`}>
            <StatCard icon="people" value={`${data?.data?.event_status?.players_registered}`} label="Players Registered" />
            <StatCard icon="cash" value={`$${data?.data?.event_status?.prize_amount}`} label="Prize Pool" />
            <StatCard icon="eye" value={`$${data?.data?.event_status?.view}`} label="Views" />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default EventOverview;
